import nodemailer from 'nodemailer'
import { FRONTEND_URL } from '../utils/constants'
import { getLogger } from '../utils/logger'

const logger = getLogger('services/email')

let transporter: nodemailer.Transporter<any> | undefined

const EMAIL_SMTP_USER = process.env.EMAIL_SMTP_USER
const EMAIL_SMTP_PASS = process.env.EMAIL_SMTP_PASS

async function init() {
    if (!EMAIL_SMTP_USER || !EMAIL_SMTP_PASS) {
        logger.error(
            'Email Service initialization failed: EMAIL_SMTP_USER or EMAIL_SMTP_PASS not found'
        )
        return
    }

    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_SMTP_USER,
            pass: EMAIL_SMTP_PASS,
        },
    })

    logger.info('Email Services successfully initialized.')
}

async function sendEmailVerification(email: string, emailVerificationToken: string) {
    if (!transporter) {
        return
    }

    const html = `Check a <a href="${FRONTEND_URL}/verification?token=${emailVerificationToken}">link</a> to verify.`

    await _sendMail({ email, subject: 'Verification | ai manager', html })
}

async function _sendMail({
    email,
    subject,
    html,
}: {
    email: string
    subject: string
    html: string
}) {
    if (!transporter) {
        return
    }

    await transporter.sendMail({
        from: `ai manager <${EMAIL_SMTP_USER}>`,
        to: email,
        subject,
        html,
    })
}

function stop() {
    transporter?.close()
}

export const emailService = {
    init,
    sendEmailVerification,
    stop,
}
