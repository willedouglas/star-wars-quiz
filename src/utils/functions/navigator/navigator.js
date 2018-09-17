const isIE = () => !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
const isEDGE = () => !!navigator.userAgent.match(/Edge/g);
const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isMobile = () => (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent);
const isTablet = () => (/Tablet|iPad/i).test(navigator.userAgent);
const getLanguage = () => navigator.userLanguage || navigator.language;

export { isIE, isEDGE, isSafari, isMobile, isTablet, getLanguage };