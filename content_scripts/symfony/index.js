(async function() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    setTimeout(function () {
        checkUsername(document.querySelector('.symfony-contributor .symfony-contributor-details'));
    }, 2500);

    async function checkUsername(contributorCard) {
        const { username } = await browser.storage.sync.get({
            username: '',
        });

        let contributorName = '__contributor_name__';

        if (contributorCard.querySelector('p.thanks a.link')) {
            contributorName = contributorCard.querySelector('p.thanks a.link').textContent;
        } else if (contributorCard.querySelector('p.thanks strong')) {
            contributorName = contributorCard.querySelector('p.thanks strong').outerText;
        }

        if (contributorName.trim() === username) {
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
            contributorCard.style.top = '230px';
            contributorCard.style.right = '10px';
            contributorCard.style.border = '3px solid rgba(52, 172, 224, 1)';
            contributorCard.style.boxShadow = '0 0 0 0 rgba(52, 172, 224, 1)';
            contributorCard.style.animation = 'pulse-blue 2s infinite';
        }
    }
})();
