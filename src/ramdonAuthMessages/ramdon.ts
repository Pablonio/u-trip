//Aqui creamos un archivo de mensajes de 2fa de la propia aplicación
export default function ramdonAuthMessages() {

    const codigos2FA = {
        codigonumero: [1,2,3,4,5,6,7,8,9],
        codigoletrasmin: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        codigoletrasmay: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        codigosespeciales: ['!','@','#','$','%','^','&','*','(',')','-','_','+','=','[',']','{','}','|',':',';','"','\'','<','>','.',',','/','?']
    }

    function getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    //ramdomizo el codigo de 2FA    
    function generate2FACode(): string {
        let code: string = '';
        code += getRandomElement(codigos2FA.codigonumero);
        code += getRandomElement(codigos2FA.codigoletrasmin);
        code += getRandomElement(codigos2FA.codigoletrasmay);
        code += getRandomElement(codigos2FA.codigosespeciales);
        code += getRandomElement(codigos2FA.codigonumero);
        code += getRandomElement(codigos2FA.codigoletrasmin);
        code += getRandomElement(codigos2FA.codigoletrasmay);
        code += getRandomElement(codigos2FA.codigosespeciales);
        code += getRandomElement(codigos2FA.codigonumero);
        code += getRandomElement(codigos2FA.codigoletrasmin);
        code += getRandomElement(codigos2FA.codigoletrasmay);
        code += getRandomElement(codigos2FA.codigosespeciales);
        code += getRandomElement(codigos2FA.codigonumero);
        code += getRandomElement(codigos2FA.codigoletrasmin);
        code += getRandomElement(codigos2FA.codigoletrasmay);
        code += getRandomElement(codigos2FA.codigosespeciales);
        return code.toString();
    };
    return generate2FACode();
}
