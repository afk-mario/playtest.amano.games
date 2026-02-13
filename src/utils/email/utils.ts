export function emailGetHTML(name: string, url: string) {
  const text = `<p>Hi ${name}! We’re reaching out because you showed interest in helping us playtest our game “Devils on the Moon Pinball”. We really appreciate it, Thank You!</p>

<p>If you’re still interested in trying out our most recent build and giving us some feedback on it again, here is a link to a new itch.io key just for you.</p>

<p><i>If it runs kinda slow on device it is because you probably have an older playdate which we have yet to optimize performance for. It’s still playable but in case you want to play a smoother version we’ve Included the web-player version of the game in your link.</i></p>

<p>Thanks Again!</p>
<p>Best!<br/>-Jp & Mario</p><br/>
<p>Key: <a href="${url}">${url}</a></p>`;
  return text;
}

export function emailGetTxt(name: string, url: string) {
  const text = `Hi ${name}! We’re reaching out because you showed interest in helping us playtest our game “Devils on the Moon Pinball”. We really appreciate it, Thank You!

If you’re still interested in trying out our most recent build and giving us some feedback on it again, here is a link to a new itch.io key just for you.

* If it runs kinda slow on device it is because you probably have an older playdate which we have yet to optimize performance for. It’s still playable but in case you want to play a smoother version we’ve Included the web-player version of the game in your link.

Thanks Again!

Best!
-Jp & Mario

Key: ${url}`;
  return text;
}
