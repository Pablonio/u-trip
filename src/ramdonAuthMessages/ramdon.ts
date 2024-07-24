//Aqui creamos un archivo de mensajes de 2fa de la propia aplicación
export default function ramdonAuthMessages() {

    const codigos2FA = {
        codigonumero: [1,2,3,4,5,6,7,8,9],
        codigoletrasmin: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        codigoletrasmay: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        codigosespeciales: ['!','@','#','$','%','^','&','*','(',')','-','_','+','=','[',']','{','}','|',':',';','"','\'','<','>','.',',','/','?'],
        //Numero y minúsculas
        codigonumeromin: ['1a','2b','3c','4d','5e','6f','7g','8h','9i','1j','2k','3l','4m','5n','6o','7p','8q','9r','1s','2t','3u','4v','5w','6x','7y','8z'],
        //Numero y mayúsculas
        codigonumeromay: ['1A','2B','3C','4D','5E','6F','7G','8H','9I','1J','2K','3L','4M','5N','6O','7P','8Q','9R','1S','2T','3U','4V','5W','6X','7Y','8Z'],
        //Numero y espaciales
        codigonumpacial: ['1!','2@','3#','4$','5%','6^','7&','8*','9(','1)','2-','3_','4+','5=','6[','7]','8{','9}','1|','2:','3;','4"','5\'','6<','7>','8.','9,','1/','2?'],
        //Minúsculas y espaciales
        codigominpacial: ['a!','b@','c#','d$','e%','f^','g&','h*','i(','j)','k-','l_','m+','n=','o[','p]','q{','r}','s|','t:','u;','v"','w\'','x<','y>','z.','a,','b/','c?'],
        //Mayúsculas y espaciales
        codigomaypacial: ['A!','B@','C#','D$','E%','F^','G&','H*','I(','J)','K-','L_','M+','N=','O[','P]','Q{','R}','S|','T:','U;','V"','W\'','X<','Y>','Z.','A,','B/','C?'],
        //Mayúsculas y minúsculas
        codigomani: ['Aa','Bb','Cc','Dd','Ee','Ff','Gg','Hh','Ii','Jj','Kk','Ll','Mm','Nn','Oo','Pp','Qq','Rr','Ss','Tt','Uu','Vv','Ww','Xx','Yy','Zz'],
        //Minúsculas y mayúsculas
        codigonula:['aA','bB','cC','dD','eE','fF','gG','hH','iI','jJ','kK','lL','mM','nN','oO','pP','qQ','rR','sS','tT','uU','vV','wW','xX','yY','zZ'],
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
        code += getRandomElement(codigos2FA.codigonumeromin);
        code += getRandomElement(codigos2FA.codigonumeromay);
        code += getRandomElement(codigos2FA.codigonumpacial);
        code += getRandomElement(codigos2FA.codigomaypacial);
        code += getRandomElement(codigos2FA.codigomani);
        code += getRandomElement(codigos2FA.codigonula);
        return code.toString();
    };
    return generate2FACode();
}
