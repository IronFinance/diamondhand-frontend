import React, { useEffect, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import Identicon from 'identicon.js';
import { useSavedConnector } from 'src/state/application/hooks';
import { useWeb3React } from '@web3-react/core';
import useWalletConnectors from 'src/hooks/useWalletConnectors';
import { Web3Provider } from '@ethersproject/providers';
import useTryConnect from 'src/hooks/useTryConnect';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import useModal from 'src/hooks/useModal';
import AccountModal from './AccountModal';
import Spacer from '../Spacer';
import { useAllTransactions } from 'src/state/transactions/hooks';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons';

const AccountButton: React.FC = () => {
  const { account, activate, connector } = useWeb3React<Web3Provider>();
  const [onPresentAccountModal] = useModal(<AccountModal />);
  const { tryConnect } = useTryConnect();
  const savedConnector = useSavedConnector();
  const connectors = useWalletConnectors();
  const { isConnected } = useConfiguration();
  const allTransactions = useAllTransactions();
  const theme = useTheme();

  const hasPendingTransaction = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter((tx) => !tx.receipt).length > 0;
  }, [allTransactions]);

  useEffect(() => {
    if (!account && savedConnector && connectors[savedConnector]) {
      activate(connectors[savedConnector], (error) => {
        console.warn('error', error);
      });
    }
  }, [account, savedConnector, connectors, activate]);

  useEffect(() => {
    if (connector) {
      const onChange = () => {
        window.location.reload();
      };
      connector.addListener('Web3ReactUpdate', onChange);

      return () => {
        connector.removeListener('Web3ReactUpdate', onChange);
      };
    }
  }, [connector]);

  const iconAccount = useMemo(() => {
    if (account) {
      const data = new Identicon(account, {
        size: 48,
        foreground: [50, 197, 255, 255],
        background: [0, 0, 0, 0],
        format: 'svg',
      }).toString();
      return `data:image/svg+xml;base64,${data}`;
    }
  }, [account]);

  const shortenAccount = useMemo(() => {
    if (account && account.length > 0) {
      return `${account.substring(0, 6)}...${account.substring(
        account.length - 4,
        account.length,
      )}`;
    }
  }, [account]);

  return (
    <StyledAccountButton active={isConnected}>
      {account ? (
        <button className="btn" onClick={onPresentAccountModal}>
          <AccountInfo>
            <img src={iconAccount} />
            {hasPendingTransaction && (
              <>
                <Spacer size="sm" />
                <Loading size="18px" color={theme.color.primary.main} />
              </>
            )}
            <Spacer size="xs" />
            <AccountNumber>{shortenAccount}</AccountNumber>
          </AccountInfo>
        </button>
      ) : !isConnected ? (
        <button className="btn">
          <FontAwesomeIcon icon={faSatelliteDish} style={{ marginRight: '5px' }} />
          <span className="d-none d-lg-inline">Waiting for network</span>
        </button>
      ) : (
        <button className="btn" onClick={() => tryConnect()}>
          Connect
        </button>
      )}
    </StyledAccountButton>
  );
};

const StyledAccountButton = styled.div<{ active?: boolean }>`
  background: ${({ theme, active }) => active && theme.color.green[100]};
`;

const AccountInfo = styled.span`
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: auto;
    border-radius: 100%;
  }
`;

const AccountNumber = styled.span`
  margin-right: 10px;
  @media (max-width: 1070px) {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export default AccountButton;
