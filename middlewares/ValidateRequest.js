module.exports.validate = (schema, property) => {
    return (req, res, next) => {
      const { error } = schema.validate(req[property]);
      const valid = error == null;
      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map(i => i.message).join(',');

        return res.send({
            status: 409,
            msg: message.replace(/[\\"]/g, ""),
            data: {},
            purpose: "Validation Error"
        })
      }
    }
}