import React from 'react';

import Menu from './menu';
import Shopping from '../../shopping/components/shopping';

import '../sass/app.sass';


const App = () => (
    <div className='app'>
        <div className='container is-fluid is-static'>
            <Shopping />
        </div>
        <Menu />
    </div>
);

export default App;
