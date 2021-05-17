(async function () {
    const { username } = await browser.storage.sync.get({
        username: '',
    });
    const $username = document.querySelector('input#username');
    $username.value = username;

    document.getElementById('save').onclick = async () => {
        await browser.storage.sync.set({ username: $username.value });
    };
})();
