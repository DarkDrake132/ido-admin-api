const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const EMAIL_TEMPLATE = {
    CONFIRM_KYC: "d-f8a51f677fe843a485bbfbac48b1684e",
    WHITELIST_SUCCESS: "d-5e332489958547e38e5e2e9a1e37ae2a"
};
  
const sendEmail = (
    toEmail,
    templateId,
    dynamicTemplateData,
) => {
    const msg = {
      to: toEmail,
      from: 'dreamlauncher.ido@gmail.com',
      templateId,
      dynamicTemplateData,
    };
    return sgMail.send(msg);
};

const sendConfirmKYCEmail = async (emails) => {
    await sendEmail(emails, EMAIL_TEMPLATE.CONFIRM_KYC)
}

// whitelist = [{email, address, maxAmount}...]
const sendWhitelistSuccessEmail = async (whitelist, projectName) => {
    await Promise.all(whitelist.map(async (user) => {
        return await sendEmail(user.email, EMAIL_TEMPLATE.WHITELIST_SUCCESS, {
            address: user.address,
            project: projectName,
            id: projectName.toLowerCase().split(' ').join('-'),
            maxAllocation: user.maxAmount,
        })
    }))
}

module.exports = {
    sendConfirmKYCEmail,
    sendWhitelistSuccessEmail
}