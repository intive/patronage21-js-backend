const generateEmailTemplate = (activationCode) => {
  return /* html */`<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>Patron-a-tive</title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }

      .mj-column-per-80 {
        width: 80% !important;
        max-width: 80%;
      }
    }
  </style>
  <style type="text/css"></style>
</head>

<body style="word-spacing:normal;">
  <div>
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div
                          style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:24px;font-weight:bold;line-height:1;text-align:center;color:#cb4173;">
                          Patron-<span style="font-weight: 400">a</span>-tive</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:480px;" ><![endif]-->
              <div class="mj-column-per-80 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                  style="border:1px solid #ddd;vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td vertical-align="top" style="font-size:0px;padding:10px;word-break:break-word;">
                        <div class="mj-column-per-100 mj-outlook-group-fix"
                          style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tbody>
                              <tr>
                                <td style="vertical-align:top;padding:10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                      <tr>
                                        <td align="center"
                                          style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                          <div
                                            style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:24px; font-weight:700; line-height:1;text-align:center;color:#2ab6fb;">
                                            Witaj w Patron-a-tive!</div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="center"
                                          style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                          <div
                                            style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:center;color:#838383;">
                                            Wygl??da na to, ??e rozpocz????e?? proces rejestracji do systemu.
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="font-size:0px;word-break:break-word;">
                                          <div style="height:30px;line-height:30px;">&#8202;</div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="center"
                                          style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                          <div
                                            style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:center;color:#2ab6f;">
                                            Poni??ej znajduje si?? kod potwierdzaj??cy Tw??j adres e-mail:
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="center"
                                          style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:36px;font-weight:bold;line-height:1;text-align:center;color:#cb4173;">
                                            ${activationCode}
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="font-size:0px;word-break:break-word;">
                                          <div style="height:30px;line-height:30px;">&#8202;</div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="center"
                                          style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                          <div
                                            style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:12px;line-height:1;text-align:center;color:#838383;">
                                            Skopiuj go i wklej do formularza rejestracyjnego, aby zako??czy?? proces autoryzacji.
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>`
}

exports.generateEmailTemplate = generateEmailTemplate
