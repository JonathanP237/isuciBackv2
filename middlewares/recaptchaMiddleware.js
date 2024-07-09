// This middleware can be used for recaptcha validation if needed
export function verifyRecaptcha(req, res, next) {
    const { recaptchaToken } = req.body;
    if (!recaptchaToken) {
      return res.status(400).json({ message: 'Falta el token del captcha.' });
    }
  
    // Recaptcha verification logic here
  
    next();
  }
  