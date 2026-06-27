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
    actionText.innerText = `Userscript "${removeInput.value}" removed at timestamp ${Math.floor(Date.now() / 1000)}!`
  } catch (error) {
    actionText.innerText = error;
  }
})
