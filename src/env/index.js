import dev from './development';
import prod from './production';

var env = dev;

if(process.env.NODE_ENV === 'production') env = prod;

export default env;