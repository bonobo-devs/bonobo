/* common.js: Shared functions for Bonobo. */

async function register_bonobo (file, is_registered) {
  let bonobo_object = JSON.parse(await file.text())
  console.log(bonobo_object)

  chrome.userScripts.register([
    {
      id: bonobo_object['id'],
      matches: bonobo_object['match'],
      js: [{ code: bonobo_object['code'] }],
      world: 'MAIN'
    }
  ])

  if (!is_registered) {
    await chrome.storage.local.set({ [bonobo_object['id']]: bonobo_object })
  }

  actionText.innerText = `Userscript "${
    bonobo_object['id']
  }" installed at timestamp ${Math.floor(Date.now() / 1000)}!`
}
