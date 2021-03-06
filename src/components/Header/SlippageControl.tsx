import React, { useCallback, useState } from 'react';
import { useGetSlippageTolerance, useSetSlipageTolerance } from '../../state/application/hooks';
import styled from 'styled-components';
import ButtonSlippage from './ButtonSlippage';
import { useConfiguration } from '../../contexts/ConfigProvider/ConfigProvider';

const SlippageControl: React.FC = () => {
  const slippage = useGetSlippageTolerance();
  const [inputSlippage, setInputSlippage] = useState<string>(`${slippage * 100}`);
  const [inputError, setInputError] = useState<string>();
  const [inputWarning, setInputWarning] = useState<string>();
  const setSlippage = useSetSlipageTolerance();
  const defaultSlippages = [0.001, 0.005, 0.01];
  const maxSlippage = 0.5;
  const highSlippage = 0.05;
  const config = useConfiguration();

  const updateSlippage = useCallback(
    (slippage: number) => {
      setInputError('');
      setInputWarning('');
      if (slippage >= maxSlippage) {
        setInputError('Enter a valid slippage value');
      } else {
        if (slippage >= highSlippage) {
          setInputWarning('You might consider a lower slippage tolerance');
        } else if (slippage < 0) {
          setInputWarning('Your transaction may fail');
        }
        setSlippage(slippage);
        setInputSlippage(`${slippage * 100}`);
      }
    },
    [setInputError, setInputWarning, setSlippage, setInputSlippage],
  );

  const onSlippageChange = useCallback(
    ({ target }: React.FormEvent<HTMLInputElement>) => {
      const value = (target as HTMLInputElement).value;
      const valueSlippage = !value ? +config.defaultSlippageTolerance : +value;
      if (isNaN(valueSlippage)) {
        setInputError('Enter a valid slippage value');
        setInputWarning('');
      } else {
        updateSlippage(valueSlippage / 100);
      }
      setInputSlippage(value);
    },
    [config, setInputError, setInputWarning, updateSlippage, setInputSlippage],
  );

  return (
    <StyledDropdownSlippage>
      <StyledDropdownSlippageHeader>
        <i className="far fa-faucet"></i>
        Slippage tollerance
      </StyledDropdownSlippageHeader>
      <StyledSlippageOptions>
        {defaultSlippages.map((s) => (
          <ButtonSlippage key={s} value={s} onClick={() => updateSlippage(s)} />
        ))}
        <ButtonSlippage border={defaultSlippages.indexOf(slippage) < 0}>
          <StyledInputContainer>
            <StyledInput
              placeholder="0.00"
              type="text"
              value={inputSlippage}
              onChange={onSlippageChange}
            />
            %
          </StyledInputContainer>
        </ButtonSlippage>
      </StyledSlippageOptions>
      {inputError && <StyledError>{inputError}</StyledError>}
      {inputWarning && <StyledWarning>{inputWarning}</StyledWarning>}
    </StyledDropdownSlippage>
  );
};

const StyledDropdownSlippage = styled.div`
  flex: 1 1 0%;
  padding: 0.5rem;
  color: ${(p) => p.theme.color.primary.main};
  font-family: ${(p) => p.theme.font.sans};
`;

const StyledDropdownSlippageHeader = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  i {
    margin-right: 5px;
    width: 18px;
    text-align: center;
  }
`;

const StyledError = styled.div`
  color: ${(props) => props.theme.color.red[600]};
  padding-top: 8px;
  font-size: 13px;
`;
const StyledWarning = styled.div`
  color: ${(props) => props.theme.color.orange[500]};
  padding-top: 8px;
  font-size: 13px;
`;

const StyledSlippageOptions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const StyledInput = styled.input`
  width: 50px;
  height: 100%;
  border: 0px;
  background: transparent;
  outline: none;
  color: ${(p) => p.theme.color.primary.main};
  border: none;
  text-align: right;
  font-weight: 600;
  &:focus {
    color: ${(p) => p.theme.color.primary.main};
  }
`;

const StyledInputContainer = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 0px;
  align-items: center;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
`;

export default SlippageControl;
