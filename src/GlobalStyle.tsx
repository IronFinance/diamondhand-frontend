import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    color: ${(p) => p.theme.color.primary.main};
    font-size: 16px;
  }

  body {
    margin: 0;
    font-family: ${(p) => p.theme.font.sans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    min-height: 100vh;
  }

  h1, h2, h3, h4,h5, h6 {
    font-family: ${(p) => p.theme.font.heading};
    font-weight: normal;
  }

  code {
    font-family: ${(p) => p.theme.font.monospace}
  }

  button {
    user-select: none;
    font-family: ${(p) => p.theme.font.heading};
  }

  .btn-group {
    display: flex;
  }

  .ml-1 {
    margin-left: 5px;
  }

  .ml-2 {
    margin-left: 10px;
  }

  .ml-3 {
    margin-left: 15px;
  }

  .btn {
    font-size: 16px;
    appearance: none;
    background: transparent;
    font-family: ${(p) => p.theme.font.heading};
    color: #460000;
    border: solid 3px #4d0000;
    height: 38px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    cursor: pointer;
    transition: ease-in-out 100ms;
    &:hover {
      background-color: ${(p) => p.theme.color.green[100]};
    }

    &.btn-icon {
      width: 38px;
      padding: 0;
      justify-content: center;
      &.btn-icon-highlight {
        background-color: ${(p) => `${p.theme.color.white}dd`};
        &:hover {
          background-color: ${(p) => p.theme.color.green[100]};
        }
      }
    }
    &.btn-triangle {
      background-color: #f69963;
      font-size: 0.8rem;
      text-decoration: none;
      i {
        transform: rotate(90deg);
      }
      &:hover {
        background-color: ${(p) => p.theme.color.green[100]};
      }
    }
  }

  a {
    color: ${(p) => p.theme.color.primary.main};
  }

  .text-primary {
    color: ${(p) => p.theme.color.primary.main};
  }

  a.link {
    color: ${({ theme }) => theme.color.grey[200]};
    &:hover {
      color: ${(p) => p.theme.color.green[100]};
    }
  }

  * {
    outline: none;
    box-sizing: border-box;
  }

  .clock {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .clock-desc {
    font-weight: 600;
    font-size: 13px;
    display: flex;
    align-items: center;
    opacity: 0.8;
    margin-left: 5px;
    display: none;
  }
  .clock-desc i {
    color: #ffa900;
    font-size: 22px;
    margin-right: 5px;
  }

  .clock-time {
    display: flex;
    align-items: center;
  }

  .clock-time-frag {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40px;
  }

  .clock-time-frag-number {
    font-size: 22px;
    font-weight: 700;
    color: #ffa900;
  }

  .clock-time-separator {
    font-weight: 700;
    color: #ffffff;
    opacity: 0.7;
    font-size: 20px;
    padding: 0 30px;
  }

  .clock-time-frag-desc {
    color: #ffffff;
    opacity: 0.7;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    .clock-time-frag {
      width: 20px;
    }
    .clock-time-frag-number {
      font-size: 16px;
    }
    .clock-time-separator {
      padding: 0 15px;
      font-size: 14px;
    }
    .clock-time-frag-desc {
      font-size: 11px;
    }
  }

  .d-none {
    display: none;
  }

  .d-lg-inline {
    @media (min-width: ${(p) => p.theme.breakpoints.lg}) {
      display: inline
    }
  }

  .d-md-inline {
    @media (min-width: ${(p) => p.theme.breakpoints.md}) {
      display: inline
    }
  }
`;
