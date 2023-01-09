import express,{Request,Response} from 'express';
import bodyParser from 'body-parser';

import * as utils from './Utils/commonImports';
import config from './Configs/config';

const app = express();
const PORT = config.port || 3000;

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api',utils.apiRoute);

app.get('/', (req: Request,res: Response) => {
    res.redirect('https://documenter.getpostman.com/view/13127908/2s8Z75SV4j');
});

app.use(() => {
    throw utils.errorResponse.json(utils.ErrorSide.page404);
});

app.use(utils.errorMiddlewere);

app.listen(PORT, () => {
    console.log(`app is listen to http://localhost:${PORT}`);
});


export default app;
