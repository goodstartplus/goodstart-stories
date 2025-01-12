function compartilhar(url) {
    if (navigator.share) {
        navigator.share({
            title: 'Confira essa Web Story!',
            url: url
        }).then(() => {
            console.log('Story compartilhado com sucesso!');
        }).catch((error) => {
            console.error('Erro ao compartilhar:', error);
        });
    } else {
        alert('Seu navegador não suporta compartilhamento. Copie este link: ' + url);
    }
}
