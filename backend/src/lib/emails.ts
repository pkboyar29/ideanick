import { promises as fs } from 'fs';
import path from 'path';
import { type Idea, type User } from '@prisma/client';
import fg from 'fast-glob';
import _ from 'lodash';
import { env } from './env';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { logger } from './logger';

const transporter = nodemailer.createTransport({
  host: '',
  port: 465, // используем SSL
  secure: true, // true для 465, false для 587
  auth: {
    user: 'sanyaursa@gmail.com',
    pass: '29092003a',
  },
});

const getHbrTemplates = _.memoize(async () => {
  // const htmlPathsPattern = path.resolve(__dirname, '../emails/dist/**/*.html');
  // const htmlPaths = fg.sync(htmlPathsPattern);
  const htmlPaths = fg.sync('src/emails/dist/**/*.html');

  const hbrTemplates: Record<string, HandlebarsTemplateDelegate> = {};
  for (const htmlPath of htmlPaths) {
    const templateName = path.basename(htmlPath, '.html');
    const htmlTemplate = await fs.readFile(htmlPath, 'utf8');
    hbrTemplates[templateName] = Handlebars.compile(htmlTemplate);
  }
  return hbrTemplates;
});

const getEmailHtml = async (
  templateName: string,
  templateVariables: Record<string, string> = {}
) => {
  const hbrTemplates = await getHbrTemplates();
  const hbrTemplate = hbrTemplates[templateName];
  const html = hbrTemplate(templateVariables);
  return html;
};

const sendEmail = async ({
  to,
  subject,
  templateName,
  templateVariables = {},
}: {
  to: string;
  subject: string;
  templateName: string;
  templateVariables?: Record<string, any>;
}) => {
  try {
    const fullTemplateVaraibles = {
      ...templateVariables,
      homeUrl: env.WEBAPP_URL,
    };
    const html = await getEmailHtml(templateName, fullTemplateVaraibles);

    const mailOptions = {
      from: 'sanyaursa@gmail.com',
      to,
      subject,
      html,
    };

    logger.info('email', 'Mail options', {
      mailOptions,
    });

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return { ok: false };
      } else {
        logger.info('email', 'Письмо отправлено');
        return { ok: true };
      }
    });
  } catch (error) {
    logger.error('email', error);
    return { ok: false };
  }
};

export const sendWelcomeEmail = async ({
  user,
}: {
  user: Pick<User, 'nick' | 'email'>;
}) => {
  return await sendEmail({
    to: user.email,
    subject: 'Thanks For Registration!',
    templateName: 'welcome',
    templateVariables: {
      userNick: user.nick,
      addIdeaUrl: `${env.WEBAPP_URL}/ideas/new`,
    },
  });
};

export const sendIdeaBlockedEmail = async ({
  user,
  idea,
}: {
  user: Pick<User, 'email'>;
  idea: Pick<Idea, 'nick'>;
}) => {
  return await sendEmail({
    to: user.email,
    subject: 'Your Idea Blocked!',
    templateName: 'ideaBlocked',
    templateVariables: {
      ideaNick: idea.nick,
    },
  });
};
