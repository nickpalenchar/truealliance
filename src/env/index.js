import dev from './development';
import prod from './production';

var env = dev;

if(process.env === 'production') env = prod;

export default env;