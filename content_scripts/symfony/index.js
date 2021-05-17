(async function() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    setTimeout(function () {
        checkUsername(document.querySelector('section.promos .col-sm-4 > .box'));
    }, 2500);

    async function checkUsername(contributorCard) {
        const { username } = await browser.storage.sync.get({
            username: '',
        });
        const contributorName = contributorCard.querySelector('strong span').textContent;

        if (contributorName === username) {
            const head = document.head || document.getElementsByTagName('head')[0];
            const style = document.createElement('style');

            head.appendChild(style);
            style.appendChild(document.createTextNode(`
        @keyframes pulse-blue {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);
          }
          
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(52, 172, 224, 0);
          }
          
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);
          }
        }`));

            contributorCard.style.position = 'fixed';
            contributorCard.style.zIndex = 9999;
            contributorCard.style.top = '3%';
            contributorCard.style.right = '1%';
            contributorCard.style.border = '3px solid rgba(52, 172, 224, 1)';
            contributorCard.style.boxShadow = '0 0 0 0 rgba(52, 172, 224, 1)';
            contributorCard.style.animation = 'pulse-blue 2s infinite';
        }
    }
})();
