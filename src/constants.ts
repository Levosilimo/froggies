export enum AppRoute {
  Login = '/login',
  Main = '/',
  Game = '/game',
  Settings = '/settings'
}

export const DEVELOPERS = [
  {
    name: 'Ivanou Andrei',
    linkPath: 'https://github.com/anjinsan132131'
  },
  {
    name: 'Alexander Mikheev',
    linkPath: 'https://github.com/solidrules'
  },
  {
    name: 'Lev Sylin',
    linkPath: 'https://github.com/Levosilimo'
  }
];

export const MAIL_REG_EXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const ERROR_MESSAGE = {
  USERNAME: 'This field is required',
  EMAIL: 'Invalid e-mail',
  LOGIN: 'This field is required',
  PASSWORD: 'Should contain min 6 symbols',
};

export const serverURL: string = 'https://rsclone-backend.adaptable.app'

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum PlayerStatus {
  Pause = 'PAUSE',
  Playing = 'PLAYING',
  Loading = 'LOADING'
}

export enum APIRoute {
  Login = '/login',
  CheckAuth = '/check-auth',
  Registration = '/register',
  Levels = '/levels',
  GetUserData = '/user',
}

export enum NameSpace {
  Game = 'GAME',
  User = 'USER',
  Player = 'PLAYER'
}

export const frogsStyleText = '.frog-item div{background-color:transparent;background-repeat:no-repeat}.frog{display:flex;z-index:4}.items-wrapper{position:absolute;width:100%;height:100%;display:flex}.frog{z-index:5}.frog-item{display:flex;justify-content:flex-start;align-items:center;width:5.21vw;height:10.5vh;z-index:2}.frog-item div{width:100%;height:100%;background-size:100%}'
export const lilypadsStyleText = ".background{display:flex;width:5.21vw;height:10.6vh;background-color:transparent;z-index:1}.items-wrapper{position:absolute;width:100%;height:100%;display:flex}"

export const getFrogSvg = (mainColor: string = "#59A47B", subColor: string = "#BFE078") => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" preserveAspectRatio="none" viewBox="-20 -10 120 120">
<animateTransform attributeType="XML" attributeName="transform" type="scale" values="1;1.08;1.07;1" additive="sum" begin="0s" dur="0.8s" repeatCount="indefinite"/>
<path fill=${mainColor} d="M79 58c0 14.3 20.3 32.5-33.7 32.5C-19.5 90.5 5 72.3 5 58s12.3-26 37-26 37 11.8 37 26Z"/>
<path fill=${subColor} d="M72 59.8c0 11.7 16.8 26.6-27.8 26.6-53.4 0-33.2-15-33.2-26.6 0-11.6 10-21.3 30.5-21.3 20.4 0 30.5 9.7 30.5 21.3Z"/>
<ellipse cx="42" cy="29.2" fill=${mainColor} rx="42" ry="24.5"/>
<ellipse cx="21.1" cy="10.4" fill=${mainColor} rx="10.9" ry="10.4"/>
<ellipse cx="64.2" cy="10.4" fill=${mainColor} rx="10.9" ry="10.4"/>
<ellipse cx="20.5" cy="9.6" fill="#1E1E1E" rx="3.8" ry="6"/>
<ellipse cx="64.4" cy="9.6" fill="#1E1E1E" rx="3.8" ry="6"/>
<ellipse cx="63.1" cy="7.8" fill="#D9D9D9" rx="1.3" ry="2.1"/>
<ellipse cx="19.2" cy="7.8" fill="#D9D9D9" rx="1.3" ry="2.1"/>
<ellipse cx="20.5" cy="15.4" fill="#E54E85" rx="3.8" ry="1.3"/>
<ellipse cx="64.4" cy="15.4" fill="#E64E85" rx="3.8" ry="1.3"/>
<path stroke="#287048" stroke-linecap="round" stroke-width="2" d="m37 16-.4.7-.2.6v.2c-.2.5 0 1 .2 1.4v0c.2.4.6.7 1 .8v0l.6.1h2.2v0c.5-.2.8-.5 1-.9l.2-.2.3-1 .2-1.1m.4-.1.2 1.2c0 .3.1.7.3 1l.1.2c.2.4.5.6 1 .8v0h2.5v0c.4-.2.7-.5.8-.8l.2-.2.2-1.1h0c0-.4 0-.8-.3-1.2l-.3-.6"/>
<path fill="#387252" d="M24.4 82c21.2-18.4 5.7 12-3.2 12s-15-9.1-15-15.6 7.3 2.2 9.4 4.2c3-10.6 6.3-11.7 8.8-.6ZM68 82c20.7-18.4 5.6 12-3.1 12S50 84.9 50 78.4s7.2 2.2 9.2 4.2c3-10.6 6.2-11.7 8.7-.6Z"/>
</svg>
`
export const getLilypadSvg = (mainColor: string = "#82D73F") => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 160 155" >
  <g filter="url(#a)" >
    <path fill=${mainColor} d="M151 73c2 1 4 2 5 5 9 15-1 34-11 46a84 84 0 0 1-47 26c-16 3-32 7-47 2l-9-3c-15-3-28-23-35-37-6-16-8-40-3-56 5-17 19-33 34-42C53 4 73 0 91 2c16 2 33 6 47 20 3 2 5 5 5 9l1 3v9l-1 5-2 5-1 3c-3 4-6 7-11 9l-6 2-3 1-22 5 34-4h4l6 1 8 2 1 1Z"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m64 5 13 71"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m17 35 59 41"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m5 85 71-9"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m17 121 60-45"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m47 148 29-72"/></g>
  <g filter="url(#b)"><path stroke="#000" d="M93 148 76 76"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m76 76 55 54"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m76 76 41-64"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m76 76 79 23"/></g>
  <g filter="url(#b)"><path stroke="#000" d="M91 6 78 75"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m41 16 35 59"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m9 62 68 14"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m13 103 64-27"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m31 134 45-58"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m70 145 6-70"/></g>
  <g filter="url(#b)"><path stroke="#000" d="M110 137 77 75"/></g>
  <g filter="url(#b)"><path stroke="#000" d="m77 75 60-40"/></g>
  <g filter="url(#b)"><path stroke="#000" d="M145 116 76 76"/></g>
  <defs>
    <filter id="a"  color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
      <feOffset dy="14"/>
      <feGaussianBlur stdDeviation="3"/>
      <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend in2="shape" result="effect1_innerShadow_1_57"/>
      <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feGaussianBlur in="effect1_innerShadow_1_57" stdDeviation="1"/>
      <feBlend in2="effect1_innerShadow_1_57" result="effect2_innerShadow_1_57"/>
    </filter>
    <filter id="b" width="1000%" height="1000%" x="-120%" y="-120%" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="2"/>
    </filter>
  </defs>
</svg>
`
