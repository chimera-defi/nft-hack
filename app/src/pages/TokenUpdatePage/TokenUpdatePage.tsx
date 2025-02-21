import React from 'react';

import { KibaException, KibaResponse, RestMethod } from '@kibalabs/core';
import { Link } from '@kibalabs/core-react';
import { Alignment, Box, Button, Direction, InputType, KibaIcon, LoadingSpinner, PaddingSize, SingleLineInput, Spacing, Stack, TabBar, Text, TextAlignment, useColors } from '@kibalabs/ui-react';
import { ContractReceipt, ContractTransaction } from 'ethers';
import { Helmet } from 'react-helmet';

import { useAccountIds, useAccounts } from '../../accountsContext';
import { PresignedUpload, TokenMetadata } from '../../client';
import { ShareForm } from '../../components/ShareForm';
import { TokenUpdateForm, UpdateResult } from '../../components/TokenUpdateForm';
import { useGlobals } from '../../globalsContext';
import { getTransactionEtherscanUrl } from '../../util/chainUtil';


export type TokenUpdatePageProps = {
  tokenId: string;
}

export const TokenUpdatePage = (props: TokenUpdatePageProps): React.ReactElement => {
  const { contract, requester, apiClient, network, web3StorageClient, web3 } = useGlobals();
  const colors = useColors();
  const [tokenMetadata, setTokenMetadata] = React.useState<TokenMetadata | null | undefined>(undefined);
  const [chainOwnerIds, setChainOwnerIds] = React.useState<Map<number, string> | null | undefined>(undefined);
  const [transaction, setTransaction] = React.useState<ContractTransaction | null>(null);
  const [offchainTransaction, setOffchainTransaction] = React.useState<Promise<void> | null>(null);
  const [transactionReceipt, setTransactionReceipt] = React.useState<ContractReceipt | null>(null);
  const [offchainTransactionReceipt, setOffchainTransactionReceipt] = React.useState<boolean | null>(null);
  const [requestHeight, setRequestHeight] = React.useState<number>(1);
  const [requestWidth, setRequestWidth] = React.useState<number>(1);
  const [updateOnchain, setUpdateOnchain] = React.useState<boolean>(false);
  const accounts = useAccounts();
  const accountIds = useAccountIds();

  const relevantTokenIds = React.useMemo((): number[] => {
    const tokenId = Number(props.tokenId);
    const tokenIds = [];
    for (let y = 0; y < requestHeight; y += 1) {
      for (let x = 0; x < requestWidth; x += 1) {
        tokenIds.push(tokenId + (y * 100) + x);
      }
    }
    return tokenIds;
  }, [props.tokenId, requestHeight, requestWidth]);

  const loadToken = React.useCallback(async (): Promise<void> => {
    setTokenMetadata(undefined);
    if (contract === null) {
      setTokenMetadata(null);
      return;
    }
    setTokenMetadata(undefined);
    if (contract === undefined) {
      return;
    }
    // NOTE(krishan711): this only works for the new contracts
    contract.tokenContentURI(Number(props.tokenId)).then((tokenMetadataUrl: string): void => {
      const url = tokenMetadataUrl.startsWith('ipfs://') ? tokenMetadataUrl.replace('ipfs://', 'https://ipfs.infura.io/ipfs/') : tokenMetadataUrl;
      requester.makeRequest(RestMethod.GET, url).then((response: KibaResponse): void => {
        const tokenMetadataJson = JSON.parse(response.content);
        // NOTE(krishan711): this should validate the content cos if someone hasn't filled it correctly it could cause something bad
        setTokenMetadata(TokenMetadata.fromObject({ ...tokenMetadataJson, tokenId: Number(props.tokenId) }));
      }).catch((error: unknown): void => {
        console.error(error);
        setTokenMetadata(null);
      });
    });
  }, [props.tokenId, contract, requester]);

  React.useEffect((): void => {
    loadToken();
  }, [loadToken]);

  const loadOwners = React.useCallback(async (): Promise<void> => {
    setChainOwnerIds(undefined);
    if (contract === null) {
      setChainOwnerIds(null);
      return;
    }
    setChainOwnerIds(undefined);
    if (contract === undefined) {
      return;
    }
    const chainOwnerIdPromises = relevantTokenIds.map(async (internalTokenId: number): Promise<string | null> => {
      try {
        return await contract.ownerOf(internalTokenId);
      } catch (error: unknown) {
        if (!(error as Error).message.includes('nonexistent token')) {
          console.error(error);
        }
        return null;
      }
    });
    const retrievedChainOwnerIds = await Promise.all(chainOwnerIdPromises);
    const calculatedChainOwnerIds = relevantTokenIds.reduce((accumulator: Map<number, string>, internalTokenId: number, index: number): Map<number, string> => {
      accumulator.set(internalTokenId, retrievedChainOwnerIds[index] as string);
      return accumulator;
    }, new Map<number, string>());
    setChainOwnerIds(calculatedChainOwnerIds);
  }, [contract, relevantTokenIds]);

  React.useEffect((): void => {
    loadOwners();
  }, [loadOwners]);

  const onImageFilesChosen = async (shouldUseIpfs: boolean, files: File[]): Promise<UpdateResult> => {
    if (!network) {
      return { isSuccess: false, message: 'Could not connect to contract. Please refresh and try again.' };
    }
    // TODO(krishan711): ensure there is only one file
    const file = files[0];
    if (shouldUseIpfs) {
      try {
        const cid = await web3StorageClient.put([file], { wrapWithDirectory: false });
        return { isSuccess: true, message: `ipfs://${cid}` };
      } catch (error: unknown) {
        console.error(error);
        return { isSuccess: false, message: 'Failed to upload file to IPFS. Please try without IPFS whilst we look into what\'s happening.' };
      }
    }
    // @ts-ignore
    const fileName = file.path.replace(/^\//g, '');
    const formData = new FormData();
    let presignedUpload: PresignedUpload;
    try {
      presignedUpload = await apiClient.generateImageUploadForToken(network, Number(props.tokenId));
    } catch (error: unknown) {
      return { isSuccess: false, message: `Failed to generate upload: ${(error as Error).message}` };
    }
    Object.keys(presignedUpload.params).forEach((key: string): void => {
      formData.set(key, presignedUpload.params[key]);
    });
    // eslint-disable-next-line no-template-curly-in-string
    formData.set('key', presignedUpload.params.key.replace('${filename}', fileName));
    formData.set('Content-Type', file.type);
    formData.append('file', file, file.name);
    try {
      await requester.makeFormRequest(presignedUpload.url, formData);
      // eslint-disable-next-line no-template-curly-in-string
      return { isSuccess: true, message: `${presignedUpload.url}${presignedUpload.params.key.replace('${filename}', fileName)}` };
    } catch (error: unknown) {
      return { isSuccess: false, message: (error as Error).message };
    }
  };

  const onTokenUpdateFormSubmitted = async (shouldUseIpfs: boolean, title: string, description: string | null, url: string | null, imageUrl: string | null): Promise<UpdateResult> => {
    if (!network || !contract || !tokenMetadata || !chainOwnerIds || !accounts || !accountIds || !web3) {
      return { isSuccess: false, message: 'Could not connect to contract. Please refresh and try again.' };
    }

    const tokenId = Number(props.tokenId);
    const chainOwnerId = chainOwnerIds.get(tokenId);
    const signerIndex = accountIds.indexOf(chainOwnerId || '0x0000000000000000000000000000000000000000');
    if (signerIndex === -1) {
      return { isSuccess: false, message: 'We failed to identify the account you need to sign this transaction. Please refresh and try again.' };
    }
    if (!title) {
      return { isSuccess: false, message: 'Please update the title.' };
    }
    if (!imageUrl) {
      return { isSuccess: false, message: 'Please provide an image.' };
    }

    const isUpdatingMultiple = requestWidth > 1 || requestHeight > 1;
    let tokenMetadataUrls: string[];
    try {
      if (isUpdatingMultiple) {
        tokenMetadataUrls = await apiClient.createMetadataForTokenGroup(network, tokenId, shouldUseIpfs, requestWidth, requestHeight, title, description, imageUrl, url);
      } else {
        const tokenMetadataUrl = await apiClient.createMetadataForToken(network, tokenId, shouldUseIpfs, title, description, imageUrl || tokenMetadata.image, url);
        tokenMetadataUrls = [tokenMetadataUrl];
      }
    } catch (error: unknown) {
      if (error instanceof KibaException && error.statusCode === 500) {
        return { isSuccess: false, message: 'Failed to upload your metadata. Please refresh and try again.' };
      }
      throw error;
    }

    if (!updateOnchain) {
      const blockNumber = await web3.getBlockNumber();
      const signer = accounts[signerIndex];
      const message = JSON.stringify({ network, tokenId, width: requestWidth, height: requestHeight, blockNumber, tokenMetadataUrls });
      const signature = await signer.signMessage(message);
      const request = apiClient.updateOffchainContentsForTokenGroup(network, tokenId, requestWidth, requestHeight, blockNumber, tokenMetadataUrls, signature);
      setOffchainTransaction(request);
      return { isSuccess: false, message: 'Update in progress.' };
    }

    let newTransaction = null;
    try {
      const contractWithSigner = contract.connect(accounts[signerIndex]);
      if (isUpdatingMultiple && contractWithSigner.setTokenGroupContentURIs) {
        newTransaction = await contractWithSigner.setTokenGroupContentURIs(tokenId, requestWidth, requestHeight, tokenMetadataUrls);
      } else if (!isUpdatingMultiple && contractWithSigner.setTokenContentURI) {
        newTransaction = await contractWithSigner.setTokenContentURI(tokenId, tokenMetadataUrls[0]);
      } else if (!isUpdatingMultiple && contractWithSigner.setTokenURI) {
        newTransaction = await contractWithSigner.setTokenURI(tokenId, tokenMetadataUrls[0]);
      } else {
        return { isSuccess: false, message: 'Could not connect to contract. Please refresh and try again.' };
      }
    } catch (error: unknown) {
      return { isSuccess: false, message: (error as Error).message };
    }
    setTransaction(newTransaction);
    return { isSuccess: false, message: `Transaction in progress. Hash is: ${newTransaction.hash}.` };
  };

  const waitForTransaction = React.useCallback(async (): Promise<void> => {
    if (transaction && network) {
      const receipt = await transaction.wait();
      setTransactionReceipt(receipt);
      relevantTokenIds.forEach((tokenId: number): void => {
        apiClient.updateTokenDeferred(network, tokenId);
      });
    } else if (offchainTransaction) {
      await offchainTransaction;
      setOffchainTransactionReceipt(true);
    }
  }, [transaction, offchainTransaction, apiClient, network, relevantTokenIds]);

  React.useEffect((): void => {
    waitForTransaction();
  }, [waitForTransaction]);

  const onRequestHeightChanged = (value: string): void => {
    if (parseInt(value, 10)) {
      setRequestHeight(parseInt(value, 10));
    }
  };

  const onRequestWidthChanged = (value: string): void => {
    if (parseInt(value, 10)) {
      setRequestWidth(parseInt(value, 10));
    }
  };

  const onTabKeySelected = (tabKey: string): void => {
    setUpdateOnchain(tabKey === 'onchain');
  };

  const unownedTokenIds = chainOwnerIds ? Array.from(chainOwnerIds.entries()).reduce((accumulator: number[], value: [number, string]): number[] => {
    if (value[1] == null || !accountIds || !accountIds.includes(value[1])) {
      accumulator.push(value[0]);
    }
    return accumulator;
  }, []) : [];
  const isOwnerOfTokens = unownedTokenIds.length === 0;

  const isValidDescription = tokenMetadata?.description && !tokenMetadata.description.startsWith('This NFT gives you full ownership');
  const isValidName = tokenMetadata?.name && !tokenMetadata.name.startsWith('MDTP Token');

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Update Token ${props.tokenId} | Million Dollar Token Page`}</title>
      </Helmet>
      <Stack direction={Direction.Vertical} isFullWidth={true} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Start} isScrollableVertically={true} paddingVertical={PaddingSize.Wide2} paddingHorizontal={PaddingSize.Wide2} shouldAddGutters={true}>
        <Text variant='header2' alignment={TextAlignment.Center}>{`Update Token ${props.tokenId}`}</Text>
        <Link text='Go to token' target={`/tokens/${props.tokenId}`} />
        <Spacing />
        { contract === null || network === null ? (
          <Text variant='error'>You can&apos;t update a token if you aren&apos;t connected to the network 🤪. Please connect using the button at the bottom of the page</Text>
        ) : tokenMetadata === null || chainOwnerIds === null || accountIds === null ? (
          <Text variant='error'>Something went wrong. Please check your accounts are connected correctly and try again.</Text>
        ) : contract === undefined || network === undefined || tokenMetadata === undefined || accountIds === undefined ? (
          <LoadingSpinner />
        ) : (transactionReceipt || offchainTransactionReceipt) ? (
          <React.Fragment>
            <KibaIcon iconId='ion-checkmark-circle' variant='extraLarge' _color={colors.success} />
            <Text>🎉 Token updated successfully 🎉</Text>
            <Spacing />
            <Text>It may take a few minutes for the page to update as doing things on a secure blockchain can take some time!</Text>
            <Spacing />
            <ShareForm
              initialShareText={`Frens, I just updated my NFT on milliondollartokenpage.com/tokens/${tokenMetadata.tokenId} @mdtp_app 🔥🔥 You too can show off your JPGs and projects here, IYKYK! 🚀`}
              minRowCount={3}
              shouldShowAllOptions={false}
            />
          </React.Fragment>
        ) : transaction ? (
          <React.Fragment>
            <LoadingSpinner />
            <Text>Your transaction is going through.</Text>
            <Text>Get ready to share once it&apos;s finished 🔥🔥</Text>
            <Spacing />
            <Button
              variant='secondary'
              text='View Transaction'
              target={getTransactionEtherscanUrl(network, transaction.hash) || ''}
            />
          </React.Fragment>
        ) : offchainTransaction ? (
          <React.Fragment>
            <LoadingSpinner />
            <Text>Your update is going through.</Text>
            <Text>Get ready to share once it&apos;s finished 🔥🔥</Text>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <TabBar selectedTabKey={updateOnchain ? 'onchain' : 'offchain'} onTabKeySelected={onTabKeySelected}>
              <TabBar.Item tabKey='offchain' text='Update off-chain' />
              <TabBar.Item tabKey='onchain' text='Update on-chain' />
            </TabBar>
            { !updateOnchain ? (
              <Text variant='note'>Off-chain updates are free as they live on our server. These do not have the same immutability and durability guarantees as on-chain.</Text>
            ) : (
              <Text variant='note'>On-chain updates cost gas to write into the Ethereum blockchain. When paired with IPFS these are as immutable and durable as Ethereum itself.</Text>
            )}
            <Spacing />
            <Stack direction={Direction.Horizontal} shouldAddGutters={true} shouldWrapItems={true} childAlignment={Alignment.Center}>
              <Text>Block width:</Text>
              <Box width='5em'>
                <SingleLineInput inputType={InputType.Number} value={String(requestWidth)} onValueChanged={onRequestWidthChanged} />
              </Box>
            </Stack>
            <Stack direction={Direction.Horizontal} shouldAddGutters={true} shouldWrapItems={true} childAlignment={Alignment.Center}>
              <Text>Block height:</Text>
              <Box width='5em'>
                <SingleLineInput inputType={InputType.Number} value={String(requestHeight)} onValueChanged={onRequestHeightChanged} />
              </Box>
            </Stack>
            <TokenUpdateForm
              title={isValidName ? tokenMetadata.name : ''}
              description={isValidDescription ? tokenMetadata.description : ''}
              url={tokenMetadata.url}
              imageUrl={null}
              onTokenUpdateFormSubmitted={onTokenUpdateFormSubmitted}
              onImageFilesChosen={onImageFilesChosen}
              isEnabled={isOwnerOfTokens}
            />
            {!isOwnerOfTokens && (
              <Text variant='error'>{`You don't own these tokens: ${unownedTokenIds.join(', ')}`}</Text>
            )}
          </React.Fragment>
        )}
      </Stack>
    </React.Fragment>
  );
};
