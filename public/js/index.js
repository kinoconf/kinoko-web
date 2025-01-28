/* 
    スタッフリスト作成
*/
fetch('staff_list.json')
    .then(response => response.json())
    .then(data => {
        const staffData = data;
        const staffListElement = document.getElementById('staff-list');

        staffData.staff.core.forEach(staff => {
            const staffCard = document.createElement('div');
            staffCard.className = 'uk-card uk-card-default uk-card-body uk-text-center';

            const link = document.createElement('a');
            link.href = staff.url || '#';
            link.target = '_blank';
            link.rel = 'noreferrer noopener'

            const avatar = document.createElement('img');
            avatar.src = staff.avatar_url || 'favicon.ico';
            avatar.alt = staff.name;
            avatar.className = 'uk-border-circle';
            avatar.style.width = '100px';
            avatar.style.height = '100px';
            avatar.style.cursor = 'pointer';

            const name = document.createElement('h4');
            name.textContent = staff.name;

            link.appendChild(avatar);
            staffCard.appendChild(link);
            staffCard.appendChild(name);

            staffListElement.appendChild(staffCard);
        });
    })
    .catch(error => console.error('Error loading staff list:', error));

const sponsorPlanSettings = {
    venue: {
        displayName: '会場スポンサー',
        imageClass: 'big',
        cardCssName: 'uk-width-1-1@s uk-width-1-1@m uk-width-1-3@l'
    },
    platinum_api: {
        displayName: 'プラチナスポンサー',
        imageClass: 'big',
        cardCssName: 'uk-width-1-1@s uk-width-1-1@m uk-width-1-3@l'
    },
    lunch_api: {
        displayName: 'ランチスポンサー',
        imageClass: 'medium',
        cardCssName: 'uk-width-1-1@s uk-width-1-3@m'
    },
    coffee_api: {
        displayName: 'コーヒースポンサー',
        imageClass: 'medium',
        cardCssName: 'uk-width-1-2@s uk-width-1-3@m'
    },
    beer_api: {
        displayName: 'ビールスポンサー',
        imageClass: 'medium',
        cardCssName: 'uk-width-1-2@s uk-width-1-3@m'
    },
    gold_api: {
        displayName: 'ゴールドスポンサー',
        imageClass: 'medium',
        cardCssName: 'uk-width-1-2@s uk-width-1-3@m'
    },
    silver_api: {
        displayName: 'シルバースポンサー',
        imageClass: 'small',
        cardCssName: 'uk-width-1-2@s uk-width-1-3@m'
    }
}

/* 
    スポンサーリスト作成
*/
fetch('sponsor_list.json')
    .then(response => response.json())
    .then(data => {
        const obj = {}
        data.sponsor_plans.forEach(plan => {
            const sponsors = plan.sponsors
                .filter(sponsor => !!sponsor.avatar)
                .map(sponsor => {return {
                    name: sponsor.name,
                    url: sponsor.url,
                    image: sponsor.avatar,
                }});
            obj[plan.name] = sponsors;
        });
        const sponsorListElement = document.getElementById('sponsor-list');
        Object.keys(sponsorPlanSettings).forEach(key => {
            const sponsorPlanAria = sponsorCard(obj[key], sponsorPlanSettings[key]);
            sponsorListElement.appendChild(sponsorPlanAria);
        });
        
    })
    .catch(error => console.error('Error loading sponsor list:', error));

const sponsorCard = (sponsors, setting) => {
    const sponsorPlanAria = document.createElement('div');
    sponsorPlanAria.className = 'uk-text-center uk-margin-top';
    if(sponsors.length === 0){
        return sponsorPlanAria;
    }
    const planNameHeader = document.createElement('h3');
    planNameHeader.textContent = setting.displayName;
    sponsorPlanAria.appendChild(planNameHeader);
    
    const sponsorCardsWrapper = document.createElement('div');
    sponsorCardsWrapper.className = `uk-flex uk-flex-center uk-text-center uk-grid-match`;
    sponsorCardsWrapper.setAttribute('uk-grid', '')

    sponsorPlanAria.appendChild(sponsorCardsWrapper);


    sponsors.forEach(sponsor => {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = `${setting.cardCssName} uk-grid-match uk-flex-center`;
        const sponsorCard = document.createElement('div');
        sponsorCard.className = 'uk-card uk-card-default uk-card-body';
        const link = document.createElement('a');
        link.href = sponsor.url || '#';
        link.target = '_blank';
        link.rel = 'noreferrer noopener'
        link.className = 'uk-flex uk-flex-center';
        const avatar = document.createElement('img');
        avatar.src = sponsor.image;
        avatar.alt = sponsor.name;
        avatar.className = `sponsors ${setting.imageClass} uk-text-center`;
        avatar.style.cursor = 'pointer';

        link.appendChild(avatar);
        sponsorCard.appendChild(link);
        cardWrapper.appendChild(sponsorCard);

        sponsorCardsWrapper.appendChild(cardWrapper);

    });
    return sponsorPlanAria;
}