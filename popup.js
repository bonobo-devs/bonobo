async function register_bonobo(file) {
    let bonobo_object = JSON.parse(await file.text());
    console.log(bonobo_object);

    chrome.userScripts.register([{
        id: bonobo_object["id"],
        matches: bonobo_object["match"],
        js: [{ code: bonobo_object["code"] }]
    }]);

    alert(bonobo_object["id"]);
}

const fileSelector = document.getElementById('file-selector');
const removeButton = document.getElementById('remove-button');
const removeInput = document.getElementById('remove-input');
fileSelector.addEventListener('change', async (event) => {
    let file = event.target.files[0];
    console.log(file);
    register_bonobo(file);
    fileSelector.value = null;
});

removeButton.addEventListener('click', () => {chrome.userScripts.unregister({ids: [removeInput.value]})})