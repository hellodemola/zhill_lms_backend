import express from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import * as Sentry from "@sentry/node";

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import studentRouter from './app/v1/student/routes/onboarding.js';
import studentCourseRouter from './app/v1/student/routes/courses.js';
import adminRouter from './app/v1/admin/routes/onboarding.js';
import adminAuthRouter from './app/v1/admin/routes/auth.js';
import adminDashboard from './app/v1/admin/routes/dashboard.js';
import authRouter from './app/v1/student/routes/auth.js';
import courseRouter from './app/v1/course/routes/course.js';
import currencyRoute from './app/v1/config/currency/routes/currency.routes.js'
import { handleError, handleExpection, handleResp } from './utils/helper.js';


const version = 'v1'
const prefix = `/api/${version}`

var app = express();

Sentry.init({
  dsn: "https://251328eea7cca9736f76ea142600783f@o313202.ingest.sentry.io/4505790178656256",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(`${prefix}/students`, studentRouter);
app.use(`${prefix}/learning`, studentCourseRouter);
app.use(`${prefix}/admins`, adminRouter);
app.use(`${prefix}/admins/auth`, adminAuthRouter);
app.use(`${prefix}/admins/dashboard`, adminDashboard);
app.use(`${prefix}/auth`, authRouter);
app.use(`${prefix}/configs/currencies`, currencyRoute);
app.use(`${prefix}/courses`, courseRouter);

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
app.use((err, req, res, next) => {
    console.log(err, 'errmiddleware');
    handleResp(res, 500, err.message)

})
export default app;
