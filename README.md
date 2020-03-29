# BootCamp-Rockeseat-Semana-1-Modulo-4
# Sobre o que se trata o módulo
Nessa parte foi continuado o desenvolvimento do back-end do GoBarber.

Foram visto conceitos como relacionamentos,banco de dados não relacionais,filas, envio de emails,tratamento de exceções,variáveis de ambiente etc.

# Multer
É uma biblioteca quem entende requisições no formato mult part form data(arquivos em outras palavras).

Ela será usada para gerenciar o avatar dos usuários que serão mandadas nas requisições.

# Instalação do Multer
yarn add multer

# Extrutura de pastas para o multer
Na raiz do projeto foi criada a pasta tmp,e dentro dela foi criada uploads que irá guardar as fotos das requisições.

Em src/config foi criado o arquivo multer.js que basicamente diz onde os arquivos da requisição ficarão(tmp/uploads) e qual será o nome deles(um nome aleatório no caso). Depois disso ele exporta essa estrutura de dados para criação de uma variável para que seja usada em routes.js.

# Arquivo src/config/multer.js
````
import multer from 'multer';
import crypto from 'crypto';
import {extname,resolve} from 'path';

export default {
    storage:multer.diskStorage({
        destination: resolve(__dirname,'..','..','tmp','uploads'),
        filename:(req,file,cb)=>{
            crypto.randomBytes(16,(err,res)=>{
                if(err) return cb(err);

                return cb(null,res.toString('hex')+extname(file.originalname));
            });
        },
    }),
};
````
