export default function(category){
    let className = '';
    switch (category) {
        case 'Switch':
            return className = 'badge-danger';
            break;     
        case '3DS':
            return className = 'badge-main';
            break;
        case 'PS4':
            return className = 'badge-dark';
            break;
    }
}






