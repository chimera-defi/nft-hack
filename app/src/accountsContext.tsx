import React from 'react';

import { IMultiAnyChildProps } from '@kibalabs/core-react';

type AccountsControl = {
  accounts: string[] | null;
  onLinkAccountsClicked: () => void;
}

export const AccountsContext = React.createContext<AccountsControl | null>(null);

interface IAccountControlProviderProps extends IMultiAnyChildProps {
  accounts: string[] | null;
  onLinkAccountsClicked: () => void;
}

export const AccountControlProvider = (props: IAccountControlProviderProps): React.ReactElement => (
  <AccountsContext.Provider value={{ accounts: props.accounts, onLinkAccountsClicked: props.onLinkAccountsClicked }}>
    {props.children}
  </AccountsContext.Provider>
);

export const useAccounts = (): string[] | null => {
  const accountsControl = React.useContext(AccountsContext);
  if (!accountsControl) {
    throw Error('accountsControl has not been initialized correctly.');
  }
  return accountsControl.accounts;
};

export const useOnLinkAccountsClicked = (): (() => void) => {
  const accountsControl = React.useContext(AccountsContext);
  if (!accountsControl) {
    throw Error('accountsControl has not been initialized correctly.');
  }
  return accountsControl.onLinkAccountsClicked;
};
