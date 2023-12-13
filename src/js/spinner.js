import { Spinner } from 'spin.js';
const refs = {
  spinner: document.querySelector('.js-backdrop'),
};
var opts = {
  lines: 12,
  length: 43,
  width: 12,
  radius: 44,
  scale: 1,
  corners: 1,
  speed: 1,
  rotate: 0,
  animation: 'spinner-line-fade-more',
  direction: 1,
  color: '#1f07d5',
  fadeColor: 'transparent',
  top: '50%',
  left: '50%',
  shadow: '0 0 1px transparent',
  zIndex: 2000000000,
  className: 'spinner',
  position: 'absolute',
};
const spinner = new Spinner(opts);
export const spinnerPlay = () => {
  spinner.spin(refs.spinner);
  refs.spinner.classList.remove('is-hidden');
};

export const spinnerStop = () => {
  spinner.stop();
  refs.spinner.classList.add('is-hidden');
};
