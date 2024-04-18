import 'dotenv/config';
import { sequelize } from './utils/db.js';
import './models/user.js';

sequelize.sync({ force: true});