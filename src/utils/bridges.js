let guoduFlag = false;
export function isMobile() {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod',
  ];

  for (const agent of Agents) {
    if (userAgentInfo.indexOf(agent) > 0) {
      return true;
    }
  }
  return false;
}

export default function openKuai(url) {
  if (isMobile() === true) {
    guoduFlag = sessionStorage.getItem('kuaiex');
    if (document.referrer.indexOf('kuaiex') !== -1 || guoduFlag) {
      guoduFlag = true;
      sessionStorage.setItem('kuaiex', true);
      location.href = `kuaiex://?${url}`;
    }
  }
}
// http://ats.kuaiex.com/home/link?op=go
