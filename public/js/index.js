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

            const avatar = document.createElement('img');
            avatar.src = staff.avatar_url || '/public/favicon.ico';
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