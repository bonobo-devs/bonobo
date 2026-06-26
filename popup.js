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

  actionText.innerText =
    'Userscript installed at timestamp ' + Math.floor(Date.now() / 1000) + '!'
}

const fileSelector = document.getElementById('file-selector')
const removeButton = document.getElementById('remove-button')
const removeInput = document.getElementById('remove-input')
const actionText = document.getElementById('action-text')

fileSelector.addEventListener('change', async event => {
  let file = event.target.files[0]
  console.log(file)
  register_bonobo(file)
  fileSelector.value = null
})

removeButton.addEventListener('click', async () => {
  try {
    await Promise.all([chrome.userScripts.unregister({ ids: [removeInput.value] }), chrome.storage.local.remove(removeInput.value)]);
    actionText.innerText = 'Userscript removed at timestamp ' + Math.floor(Date.now() / 1000) + '!'
  } catch (error) {
    actionText.innerText = error;
  }
})
