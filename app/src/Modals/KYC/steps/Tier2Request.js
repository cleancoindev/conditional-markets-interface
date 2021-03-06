import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import Logo from "assets/img/emote_trade_limit.svg";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";

import TextInput from "components/Form/TextInput";
import CheckboxInput from "components/Form/Checkbox";
import Captcha from "components/Form/Captcha";
import UpperBar from "../../components/upperBar";
import Header from "../../components/header";

import { postTier2Request } from "api/onboarding";

import cn from "classnames/bind";

import style from "../kyc.scss";
import { STEP_TIER2_REQUEST_SUCCESS } from "../";

import { isRequired, validator, isEmail } from "../../../utils/validations";

import TOS_DocumentURL from "assets/pdfs/TOS_SIGHT_JULY_2019.pdf";

const cx = cn.bind(style);

const VALIDATIONS = {
  acceptTos: [isRequired],
  acceptPrivacy: [isRequired],
  email: [isRequired, isEmail],
  recaptchaToken: [isRequired]
};

const Tier2Request = ({ closeModal, handleAdvanceStep }) => {
  const captcha = useRef(null);

  const onSubmit = useCallback(async values => {
    const personalDetails = {
      ...values
    };

    const [response, json] = await postTier2Request(personalDetails);

    if (!response.ok) {
      if (response.code === 400) {
        return json;
      } else if (response.code === 403) {
        return {
          [FORM_ERROR]:
            "Your address is already being processed. Please wait until your application has been approved."
        };
      } else {
        return {
          [FORM_ERROR]:
            "Unfortunately, the whitelisting API returned a non-standard error. Please try again later."
        };
      }
    }

    handleAdvanceStep([
      STEP_TIER2_REQUEST_SUCCESS,
      {
        email: values.email
      }
    ]);
  }, []);

  return (
    <>
      <UpperBar closeModal={closeModal} title="Get Verified"></UpperBar>
      <Header logo={Logo}></Header>
      <div className={cx("modal-body")}>
        <p>
          As non-EU resident you'll need to apply for Tier 2 to trade. Provide
          your email address to start the KYC process
        </p>
        <div className={cx("form")}>
          <Form
            onSubmit={onSubmit}
            validate={validator(VALIDATIONS)}
            render={({ handleSubmit, submitError, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  className={cx("field")}
                  name="email"
                  label="E-mail Address*"
                  component={TextInput}
                />
                <div className={cx("field", "field-row")}>
                  <Field
                    name="acceptTos"
                    component={CheckboxInput}
                    type="checkbox"
                    label={
                      <a
                        href={TOS_DocumentURL}
                        target="_BLANK"
                        rel="noreferrer noopener"
                      >
                        Terms & Conditions*
                      </a>
                    }
                  />
                  <Field
                    name="acceptPrivacy"
                    component={CheckboxInput}
                    type="checkbox"
                    label={
                      <a
                        href="https://sight.pm/privacy.html"
                        target="_BLANK"
                        rel="noreferrer noopener"
                      >
                        Privacy Policy*
                      </a>
                    }
                  />
                  <Field
                    name="acceptNewsletter"
                    component={CheckboxInput}
                    type="checkbox"
                    label="Newsletter & Updates"
                  />
                </div>
                <Field
                  className={cx("field")}
                  ref={captcha}
                  name="recaptchaToken"
                  component={Captcha}
                />
                {submitError && <p className={cx("error")}>{submitError}</p>}
                <Button
                  className={cx("field", "material-button")}
                  classes={{ label: cx("material-button-label") }}
                  disabled={submitting}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  {submitting ? "Please wait" : "Submit request"}
                </Button>
              </form>
            )}
          />
        </div>
        <Link
          className={cx("cancel-button")}
          component="button"
          onClick={closeModal}
          underline="always"
        >
          Cancel
        </Link>
      </div>
    </>
  );
};

Tier2Request.propTypes = {
  closeModal: PropTypes.func.isRequired,
  handleAdvanceStep: PropTypes.func.isRequired
};

export default Tier2Request;
