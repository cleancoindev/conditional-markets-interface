import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import cn from "classnames/bind";
import useInterval from "@use-it/interval";

import Button from "@material-ui/core/Button";

import Spinner from "components/Spinner";
import { getAccount, loadWeb3 } from "utils/web3";
import getWeb3Modal from "utils/web3Modal";

import { getUserState } from "api/onboarding";

import style from "./tier2.scss";
const cx = cn.bind(style);

import conf from "../../../conf";

import Logo from "img/conditional-logo-color.svg";
import LoggedIn from "./LoggedIn";

export const STEP_TERMS_AND_CONDITIONS = "TERMS_AND_CONDITIONS";
export const STEP_SOURCE_OF_WEALTH = "SOURCE_OF_WEALTH";
export const STEP_SUMSUB_FORM = "SUMSUB_FORM";
export const STEP_ALREADY_VERIFIED = "ALREADY_VERIFIED";
export const STEP_TOKEN_EXPIRED = "TOKEN_EXPIRED";

// Child components loaded lazily on Tier2 load
const STEP_COMPONENTS = {
  [STEP_TERMS_AND_CONDITIONS]: () => import("./steps/TermsAndConditions"),
  [STEP_SOURCE_OF_WEALTH]: () => import("./steps/SourceOfWealth"),
  [STEP_SUMSUB_FORM]: () => import("./steps/SumSubForm"),
  [STEP_ALREADY_VERIFIED]: () => import("./steps/AlreadyVerified"),
  [STEP_TOKEN_EXPIRED]: () => import("./steps/TokenExpired")
};

const SYNC_INTERVAL = 5000;
const REST_SYNC_INTERVAL = 15000;

const web3Modal = getWeb3Modal();

const Tier2 = props => {
  const [stepComponents, setStepComponents] = useState(null);
  const [loading, setLoading] = useState("LOADING");

  const [currentStepIndex, setCurrentStepIndex] = useState(
    STEP_TERMS_AND_CONDITIONS
  );
  const [currentStepProps, setCurrentStepProps] = useState(props);

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [tier2Status, setTier2Status] = useState(null);

  const routerLocation = useLocation();
  const [email, setEmail] = useState(null);

  const handleAdvanceStep = useCallback(nextStep => {
    if (Array.isArray(nextStep)) {
      const [step, props] = nextStep;
      setCurrentStepIndex(step);
      setCurrentStepProps(props);
    } else {
      setCurrentStepIndex(nextStep);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading("LOADING");
      const loadedStepComponents = {};
      const allComponentsPromises = Promise.all(
        Object.keys(STEP_COMPONENTS).map(async stepName => {
          loadedStepComponents[stepName] = (
            await STEP_COMPONENTS[stepName]()
          ).default;
        })
      );
      await allComponentsPromises;

      setStepComponents(loadedStepComponents);
      setLoading("SUCCESS");
    })();
  }, ["hot"]);

  const init = useCallback(async provider => {
    let web3Provider = provider;
    if (!provider && web3Modal.cachedProvider) {
      web3Provider = await web3Modal.connect();
    }
    const { web3, account } = await loadWeb3(conf.networkId, web3Provider);

    setWeb3(web3);
    setAccount(account);
    setLoading("SUCCESS");
  });

  const setProvider = useCallback(
    async provider => {
      if (
        provider === null &&
        web3 &&
        web3.currentProvider &&
        web3.currentProvider.close
      ) {
        await web3.currentProvider.close();
      }
      setLoading("LOADING");
      init(provider);
    },
    [web3, init]
  );

  const connect = useCallback(
    provider => {
      setProvider(provider);
    },
    [setProvider]
  );

  const disconnect = useCallback(() => {
    web3Modal.clearCachedProvider();
    setProvider(null);
    setCurrentStepIndex(STEP_TERMS_AND_CONDITIONS);
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(routerLocation.search);
    setEmail(searchParams.get("email"));

    web3Modal.on("connect", connect);

    web3Modal.on("disconnect", () => {
      disconnect();
    });

    web3Modal.on("close", () => {});
    // Cleanup on component destroy (contract reloading needs to recreate connect function)
    return function cleanupListener() {
      // Cleanup all litseners at once
      web3Modal.off("connect");
      web3Modal.off("disconnect");
      web3Modal.off("close");
    };
  }, []);

  const getAccountInfo = useCallback(async () => {
    const currentUserState = await getUserState(account);

    if (currentUserState && currentUserState.tiers) {
      setTier2Status(currentUserState.tiers[2].status);
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      getAccountInfo();
    }
  }, [account]);

  useInterval(getAccountInfo, REST_SYNC_INTERVAL);

  useEffect(() => {
    if (tier2Status === "ENABLED") {
      setCurrentStepIndex(STEP_ALREADY_VERIFIED);
    } else if (tier2Status === "PENDING_VERIFICATION") {
      setCurrentStepIndex(STEP_SUMSUB_FORM);
    }
  }, [tier2Status]);

  const checkAccount = useCallback(async () => {
    if (web3) {
      const currentAccount = await getAccount(web3);
      if (currentAccount !== account) {
        setAccount(currentAccount);
        setCurrentStepIndex(STEP_TERMS_AND_CONDITIONS);
      }
    }
  }, [account, web3]);

  useInterval(checkAccount, SYNC_INTERVAL);

  if (loading === "LOADING") {
    return (
      <div className={cx("page", "loading")}>
        <div className={cx("header")}>
          <img src={Logo} alt="Gnosis Conditional Tokens" />
          {account && <LoggedIn address={account} disconnect={disconnect} />}
        </div>
        <div className={cx("app-space")}>
          <div className={cx("step")}>
            <Spinner inverted centered width={100} height={100} />
          </div>
        </div>
      </div>
    );
  }

  const TargetComponent = stepComponents[currentStepIndex];
  return (
    <div className={cx("page")}>
      <div className={cx("header")}>
        <img src={Logo} alt="Gnosis Conditional Tokens" />
        {account && <LoggedIn address={account} disconnect={disconnect} />}
      </div>
      <div
        className={cx(
          currentStepIndex !== STEP_SUMSUB_FORM ? "app-space" : "sumsub-form"
        )}
      >
        {!account && (
          <div className={cx("step", "connect")}>
            <div className={cx("step-header")}>
              <p>Get Tier 2 Verification</p>
            </div>
            <p className={cx("step-description")}>
              Connect your web 3 wallet to begin.
            </p>
            <Button
              className={cx("material-button", "big")}
              classes={{ label: cx("material-button-label") }}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              onClick={() => web3Modal.toggleModal()}
            >
              Connect your wallet
            </Button>
          </div>
        )}
        {account && (
          <TargetComponent
            account={account}
            email={email}
            handleAdvanceStep={handleAdvanceStep}
            {...currentStepProps}
          />
        )}
      </div>
    </div>
  );
};

export default Tier2;
