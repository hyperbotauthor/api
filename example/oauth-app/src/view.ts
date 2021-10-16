import { h, VNode } from 'snabbdom';
import { lichessHost, clientUrl, Ctrl } from './ctrl';

export function view(ctrl: Ctrl): VNode {
  const token = ctrl.accessContext?.token?.value

  if(token){
    localStorage.setItem("LICHESS_TOKEN", token)
  }

  return h('table', [
    h('tr', [
      h('td', 'Back to home'),
      h('td', [
        h('a', {
          attrs: {
              href: ctrl.homeUrl
            }
          },
          ctrl.homeUrl
        )
      ]),
    ]),
    h('tr', [h('td', 'Lichess Host'), h('td', lichessHost)]),
    h('tr', [h('td', 'Client URL'), h('td', clientUrl)]),
    h('tr', [h('td', 'Error'), h('td', ctrl.error?.toString())]),    
    h('tr', [h('td', 'Access token (secret)'), h('td', token ? [
      "token obtained  ",
      h(
          'button',
          {            
            on: { click: () => window.alert(`${token}`) },
          },
          'Reveal token'
        ),
    ] : "no token")]),    
    h('tr', [h('td', 'Lichess account email'), h('td', ctrl.email)]),
    h('tr', [
      h('td', ''),
      h('td', [
        h(
          'button',
          {
            attrs: { disabled: !!ctrl.accessContext?.token },
            on: { click: () => ctrl.login() },
          },
          'Login'
        ),
        ' ',
        h(
          'button',
          {
            attrs: { disabled: !ctrl.error && !ctrl.accessContext?.token },
            on: { click: () => ctrl.logout() },
          },
          ctrl.accessContext ? 'Logout' : 'Reset'
        ),
      ]),
    ]),
  ]);
}
