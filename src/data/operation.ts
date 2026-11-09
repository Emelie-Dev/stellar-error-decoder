import type { ErrorDetails } from "../types.js";

const docsUrl =
  "https://developers.stellar.org/docs/learn/fundamentals/transactions/operations-and-transactions";
const make = (meaning: string, cause: string, fix: string): ErrorDetails => ({
  meaning,
  causes: [cause],
  fixes: [fix],
  docsUrl,
});

export const operationErrors: Record<string, ErrorDetails> = {
  op_bad_auth: make(
    "The operation does not have the required authorization.",
    "The operation's source account lacks the required signer authorization.",
    "Check account thresholds and add the required valid signer.",
  ),
  op_no_account: make(
    "The operation's source account does not exist.",
    "The specified operation source account has not been created or was merged.",
    "Use an existing account and ensure the transaction source can authorize it.",
  ),
  op_no_source_account: make(
    "The operation's source account does not exist.",
    "The specified operation source account has not been created or was merged.",
    "Use an existing account and ensure the transaction source can authorize it.",
  ),
  op_not_supported: make(
    "This operation is not supported by the target network.",
    "The operation requires a protocol feature unavailable on this network.",
    "Check the network protocol version and choose a supported operation.",
  ),
  op_too_many_subentries: make(
    "The account has reached the maximum number of ledger entries it can own.",
    "Adding this entry would exceed the account's subentry limit.",
    "Remove unnecessary entries or use a different account.",
  ),
  op_too_many_sponsoring: make(
    "The account is sponsoring the maximum number of ledger entries.",
    "Adding another sponsored entry would exceed the sponsorship limit.",
    "End or transfer an existing sponsorship before sponsoring another entry.",
  ),
  payment_malformed: make(
    "The payment operation contains invalid parameters.",
    "The destination, asset, or amount is invalid.",
    "Use a valid destination, positive amount, and supported asset.",
  ),
  payment_underfunded: make(
    "The sending account does not have enough of the asset to make the payment.",
    "The source balance is lower than the requested payment amount.",
    "Fund the source account with the asset or reduce the payment amount.",
  ),
  payment_src_no_trust: make(
    "The sending account has no trustline for the asset.",
    "The source has not established trust in the asset it is sending.",
    "Create a trustline for the asset on the source account.",
  ),
  payment_src_not_authorized: make(
    "The sending account is not authorized to transfer the asset.",
    "The asset issuer requires authorization and the source is not authorized.",
    "Ask the issuer to authorize the source or send an asset it may transfer.",
  ),
  payment_no_destination: make(
    "The payment destination account does not exist.",
    "The destination has not been created or was merged.",
    "Create the destination account or use an existing account.",
  ),
  payment_no_trust: make(
    "The destination has no trustline for the asset.",
    "The destination has not established trust in the asset.",
    "Have the destination create a trustline for the asset before paying it.",
  ),
  payment_not_authorized: make(
    "The destination is not authorized to hold this asset.",
    "The asset issuer requires authorization and the destination is not authorized.",
    "Ask the issuer to authorize the destination or use an authorized destination.",
  ),
  payment_line_full: make(
    "The destination trustline has no room for this payment.",
    "The payment would exceed the trustline's limit.",
    "Increase the trustline limit or send a smaller amount.",
  ),
  payment_no_issuer: make(
    "The asset issuer account does not exist.",
    "The asset refers to an issuer that is missing or invalid.",
    "Verify the asset code and issuer account ID.",
  ),
  create_account_malformed: make(
    "The create-account operation has invalid parameters.",
    "The starting balance or destination account ID is invalid.",
    "Use a valid public key and a positive starting balance.",
  ),
  create_account_underfunded: make(
    "The source account cannot fund the new account's starting balance and reserve.",
    "The source balance is too low for the requested starting balance.",
    "Fund the source account or lower the starting balance.",
  ),
  create_account_low_reserve: make(
    "The new account's starting balance is below the network's minimum reserve.",
    "The requested starting balance is too low for the minimum account reserve.",
    "Increase the starting balance to meet the current minimum reserve.",
  ),
  create_account_already_exist: make(
    "The destination account already exists.",
    "An account with the destination public key is already on the ledger.",
    "Use a different destination or fund the existing account instead.",
  ),
  change_trust_malformed: make(
    "The change-trust operation has invalid parameters.",
    "The asset or trustline limit is invalid.",
    "Check the asset definition and use a valid non-negative limit.",
  ),
  change_trust_no_issuer: make(
    "The issuer of the requested trustline asset does not exist.",
    "The asset references an issuer account that is missing or invalid.",
    "Verify the asset code and issuer account ID.",
  ),
  change_trust_invalid_limit: make(
    "The requested trustline limit is below the balance held on that line.",
    "The limit is below the current balance or is zero when creating a trustline.",
    "Choose a nonzero limit at least as large as the current balance.",
  ),
  change_trust_low_reserve: make(
    "The account lacks the reserve needed to create this trustline.",
    "The account does not have enough available XLM for another subentry.",
    "Fund the account or remove another subentry.",
  ),
  change_trust_self_not_allowed: make(
    "An account cannot create a trustline to its own issued asset.",
    "The trustline issuer and trustor are the same account.",
    "Use a different issuer or omit the trustline.",
  ),
  change_trust_trust_line_missing: make(
    "The trustline required by the operation is missing.",
    "The account has no matching trustline.",
    "Create the trustline or use an asset already held by the account.",
  ),
  change_trust_cannot_delete: make(
    "The trustline cannot be removed while it is referenced by a liquidity pool.",
    "The trustline is still used by a pool.",
    "Remove the account's liquidity pool position before deleting the trustline.",
  ),
  change_trust_not_auth_maintain_liabilities: make(
    "The trustline has been deauthorized and cannot maintain liabilities.",
    "The issuer revoked authorization while the trustline still has liabilities.",
    "Settle or remove liabilities and resolve authorization with the issuer.",
  ),
  manage_sell_offer_malformed: make(
    "The sell-offer parameters are invalid.",
    "The asset pair, amount, price, or offer ID is invalid.",
    "Check the offer assets, positive amount, price, and offer ID.",
  ),
  manage_sell_offer_sell_no_trust: make(
    "The seller has no trustline for the asset being sold.",
    "The selling account has not established trust in the selling asset.",
    "Create a trustline for the selling asset.",
  ),
  manage_sell_offer_buy_no_trust: make(
    "The seller has no trustline for the asset being bought.",
    "The selling account has not established trust in the buying asset.",
    "Create a trustline for the buying asset.",
  ),
  manage_sell_offer_sell_not_authorized: make(
    "The seller is not authorized to hold the asset being sold.",
    "The asset issuer requires authorization for the seller.",
    "Obtain authorization from the issuer.",
  ),
  manage_sell_offer_buy_not_authorized: make(
    "The seller is not authorized to hold the asset being bought.",
    "The asset issuer requires authorization for the seller.",
    "Obtain authorization from the issuer.",
  ),
  manage_sell_offer_line_full: make(
    "A trustline involved in the offer would exceed its limit.",
    "The offer's matching trades could overfill a trustline.",
    "Raise the trustline limit or reduce the offer amount.",
  ),
  manage_sell_offer_underfunded: make(
    "The seller does not have enough of the selling asset.",
    "The offer amount exceeds the seller's available balance.",
    "Fund the selling account or reduce the offer amount.",
  ),
  manage_sell_offer_cross_self: make(
    "The offer would trade against another offer from the same account.",
    "A matching offer on the order book belongs to the seller.",
    "Adjust the offer price or cancel the conflicting offer.",
  ),
  manage_sell_offer_sell_no_issuer: make(
    "The selling asset issuer does not exist.",
    "The offer references an invalid selling asset issuer.",
    "Verify the selling asset code and issuer account.",
  ),
  manage_sell_offer_buy_no_issuer: make(
    "The buying asset issuer does not exist.",
    "The offer references an invalid buying asset issuer.",
    "Verify the buying asset code and issuer account.",
  ),
  manage_sell_offer_not_found: make(
    "The offer to update or delete was not found.",
    "The offer ID does not exist or is no longer active.",
    "Fetch the account's current offers and use a valid offer ID.",
  ),
  manage_sell_offer_low_reserve: make(
    "The account lacks the reserve required for the new offer.",
    "Creating the offer would exceed the account's available reserve.",
    "Fund the account or remove another subentry.",
  ),
  manage_buy_offer_malformed: make(
    "The buy-offer parameters are invalid.",
    "The asset pair, amount, price, or offer ID is invalid.",
    "Check the offer assets, positive amount, price, and offer ID.",
  ),
  manage_buy_offer_buy_no_trust: make(
    "The buyer has no trustline for the asset being bought.",
    "The account has not established trust in the buying asset.",
    "Create a trustline for the buying asset.",
  ),
  manage_buy_offer_sell_no_trust: make(
    "The buyer has no trustline for the asset being sold.",
    "The account has not established trust in the selling asset.",
    "Create a trustline for the selling asset.",
  ),
  manage_buy_offer_sell_not_authorized: make(
    "The buyer is not authorized to hold the asset being sold.",
    "The asset issuer requires authorization for the buyer.",
    "Obtain authorization from the issuer.",
  ),
  manage_buy_offer_buy_not_authorized: make(
    "The buyer is not authorized to hold the asset being bought.",
    "The asset issuer requires authorization for the buyer.",
    "Obtain authorization from the issuer.",
  ),
  manage_buy_offer_line_full: make(
    "A trustline involved in the offer would exceed its limit.",
    "The offer's matching trades could overfill a trustline.",
    "Raise the trustline limit or reduce the offer amount.",
  ),
  manage_buy_offer_underfunded: make(
    "The buyer does not have enough of the asset used to pay.",
    "The offer exceeds the account's available balance.",
    "Fund the account or reduce the offer amount.",
  ),
  manage_buy_offer_cross_self: make(
    "The offer would trade against another offer from the same account.",
    "A matching offer on the order book belongs to the buyer.",
    "Adjust the offer price or cancel the conflicting offer.",
  ),
  manage_buy_offer_sell_no_issuer: make(
    "The selling asset issuer does not exist.",
    "The offer references an invalid selling asset issuer.",
    "Verify the selling asset code and issuer account.",
  ),
  manage_buy_offer_buy_no_issuer: make(
    "The buying asset issuer does not exist.",
    "The offer references an invalid buying asset issuer.",
    "Verify the buying asset code and issuer account.",
  ),
  manage_buy_offer_not_found: make(
    "The offer to update or delete was not found.",
    "The offer ID does not exist or is no longer active.",
    "Fetch the account's current offers and use a valid offer ID.",
  ),
  manage_buy_offer_low_reserve: make(
    "The account lacks the reserve required for the new offer.",
    "Creating the offer would exceed the account's available reserve.",
    "Fund the account or remove another subentry.",
  ),
  path_payment_strict_receive_malformed: make(
    "The strict-receive path payment parameters are invalid.",
    "The amount, assets, destination, or path is malformed.",
    "Check all assets, use a positive amount, and keep the path within protocol limits.",
  ),
  path_payment_strict_receive_underfunded: make(
    "The source account cannot fund the strict-receive payment.",
    "The source lacks enough of the send asset, including fees or liabilities.",
    "Fund the source account or lower the send amount.",
  ),
  path_payment_strict_receive_src_no_trust: make(
    "The source account has no trustline for the send asset.",
    "The source has not established trust in the send asset.",
    "Create a trustline for the send asset.",
  ),
  path_payment_strict_receive_src_not_authorized: make(
    "The source is not authorized to send the asset.",
    "The send asset requires issuer authorization.",
    "Obtain authorization from the issuer.",
  ),
  path_payment_strict_receive_no_destination: make(
    "The payment destination does not exist.",
    "The destination account has not been created or was merged.",
    "Create or select an existing destination account.",
  ),
  path_payment_strict_receive_no_trust: make(
    "The destination has no trustline for the receive asset.",
    "The destination has not established trust in the receive asset.",
    "Create a trustline at the destination.",
  ),
  path_payment_strict_receive_not_authorized: make(
    "The destination is not authorized to hold the receive asset.",
    "The issuer requires authorization for the destination.",
    "Obtain authorization for the destination from the issuer.",
  ),
  path_payment_strict_receive_line_full: make(
    "The destination trustline cannot receive the full payment.",
    "The destination's trustline limit would be exceeded.",
    "Raise the trustline limit or lower the destination amount.",
  ),
  path_payment_strict_receive_no_issuer: make(
    "An asset issuer in the payment path does not exist.",
    "An asset is configured with a missing issuer.",
    "Verify each path asset and issuer.",
  ),
  path_payment_strict_receive_offer_cross_self: make(
    "The path payment would cross an offer owned by its source account.",
    "A matching offer along the path belongs to the source.",
    "Cancel or adjust the conflicting offer and retry.",
  ),
  path_payment_strict_receive_over_sendmax: make(
    "The payment would require more than the maximum send amount.",
    "Available prices or liquidity exceed sendMax.",
    "Raise sendMax or reduce the destination amount.",
  ),
  path_payment_strict_send_malformed: make(
    "The strict-send path payment parameters are invalid.",
    "The amount, assets, destination, or path is malformed.",
    "Check the assets and amounts, and keep the path within protocol limits.",
  ),
  path_payment_strict_send_underfunded: make(
    "The source account cannot fund the strict-send payment.",
    "The source lacks enough of the send asset.",
    "Fund the source account or reduce the send amount.",
  ),
  path_payment_strict_send_src_no_trust: make(
    "The source account has no trustline for the send asset.",
    "The source has not established trust in the send asset.",
    "Create a trustline for the send asset.",
  ),
  path_payment_strict_send_src_not_authorized: make(
    "The source is not authorized to send the asset.",
    "The send asset requires issuer authorization.",
    "Obtain authorization from the issuer.",
  ),
  path_payment_strict_send_no_destination: make(
    "The payment destination does not exist.",
    "The destination account has not been created or was merged.",
    "Create or select an existing destination account.",
  ),
  path_payment_strict_send_no_trust: make(
    "An account along the path has no required trustline.",
    "A path participant has not established trust in an asset.",
    "Create the missing trustline and retry.",
  ),
  path_payment_strict_send_not_authorized: make(
    "An account along the path is not authorized for an asset.",
    "An issuer requires authorization from a path participant.",
    "Obtain the necessary issuer authorization.",
  ),
  path_payment_strict_send_line_full: make(
    "A destination trustline cannot receive the path payment.",
    "The trustline limit would be exceeded.",
    "Increase the trustline limit or reduce the send amount.",
  ),
  path_payment_strict_send_no_issuer: make(
    "An asset issuer in the payment path does not exist.",
    "An asset is configured with a missing issuer.",
    "Verify each path asset and issuer.",
  ),
  path_payment_strict_send_offer_cross_self: make(
    "The path payment would cross an offer owned by its source account.",
    "A matching offer along the path belongs to the source.",
    "Cancel or adjust the conflicting offer and retry.",
  ),
  path_payment_strict_send_under_destmin: make(
    "The payment path cannot deliver the minimum destination amount.",
    "Available prices or liquidity would deliver less than destMin.",
    "Choose another path, increase liquidity, or reduce destMin.",
  ),
  set_options_malformed: make(
    "The set-options operation contains invalid values.",
    "A signer, threshold, home domain, or flag value is invalid.",
    "Validate each set-options field against Stellar limits.",
  ),
  set_options_low_reserve: make(
    "The account lacks reserve for the signer or entry being added.",
    "Adding the option would create a subentry without enough XLM reserve.",
    "Fund the account or remove another subentry.",
  ),
  set_options_too_many_signers: make(
    "The account already has the maximum number of signers.",
    "Adding this signer exceeds the signer limit.",
    "Remove an unused signer before adding another.",
  ),
  set_options_bad_flags: make(
    "The requested account flags are invalid.",
    "The flag combination is unsupported or improperly set.",
    "Use only supported flags and ensure the source can change them.",
  ),
  set_options_invalid_inflation: make(
    "The specified inflation destination account does not exist.",
    "The inflation destination is not an existing account.",
    "Use an existing account as the inflation destination.",
  ),
  set_options_cant_change: make(
    "This account option can no longer be changed.",
    "The requested setting is immutable once enabled or disabled.",
    "Use an account whose setting can still be changed.",
  ),
  set_options_unknown_flag: make(
    "The operation specifies an unrecognized account flag.",
    "A flag bit is not supported by this network protocol.",
    "Use only account flags supported by the target network.",
  ),
  set_options_threshold_out_of_range: make(
    "A signer weight or account threshold is outside the permitted range.",
    "The configured weight or threshold is invalid.",
    "Use integer weights and thresholds within the protocol's allowed range.",
  ),
  set_options_bad_signer: make(
    "The requested signer is invalid.",
    "The operation attempts to add the master key as an extra signer.",
    "Use a different signer key or remove the redundant signer.",
  ),
  set_options_invalid_home_domain: make(
    "The home domain is invalid.",
    "The supplied domain name exceeds limits or contains invalid data.",
    "Use a valid domain name within protocol limits.",
  ),
  set_options_auth_revocable_required: make(
    "The account must have revocable authorization enabled before enabling clawback.",
    "The account's authorization flags do not permit clawback.",
    "Enable revocable authorization before enabling clawback.",
  ),
  account_merge_malformed: make(
    "The account-merge operation is malformed.",
    "The source and destination accounts cannot be merged as specified.",
    "Check both account IDs and ensure they are different.",
  ),
  account_merge_no_account: make(
    "The destination account for the merge does not exist.",
    "The destination account has not been created or was merged away.",
    "Create the destination account or choose an existing account.",
  ),
  account_merge_immutable_set: make(
    "The account cannot be merged because its authorization is immutable.",
    "The source account has the AUTH_IMMUTABLE flag set.",
    "Use an account that is not immutable; this flag cannot be reversed.",
  ),
  account_merge_has_sub_entries: make(
    "The account cannot be merged while it owns ledger entries.",
    "Trustlines, offers, signers, or other subentries remain.",
    "Remove or transfer all owned entries before merging.",
  ),
  account_merge_seqnum_too_far: make(
    "The merge destination sequence number is too far ahead.",
    "The destination sequence number violates merge restrictions.",
    "Refresh sequence numbers and retry with a valid transaction.",
  ),
  account_merge_dest_full: make(
    "The destination account cannot receive the merged balance.",
    "The resulting balance would exceed the destination's allowed balance.",
    "Choose another destination or reduce the amount merged.",
  ),
  account_merge_is_sponsor: make(
    "The account cannot be merged while it is sponsoring ledger entries.",
    "The account is still a sponsor for one or more entries.",
    "End or transfer its sponsorships before attempting to merge it.",
  ),
  allow_trust_malformed: make(
    "The allow-trust operation contains invalid parameters.",
    "The asset or trustor account is invalid.",
    "Verify the asset code and trustor account ID.",
  ),
  allow_trust_no_trust_line: make(
    "The trustor has no trustline for this asset.",
    "There is no matching trustline to authorize or deauthorize.",
    "Have the trustor establish the trustline first.",
  ),
  allow_trust_trust_not_required: make(
    "The asset does not require the authorization being changed.",
    "The asset issuer has not enabled authorization requirements.",
    "Review the issuer's asset flags; no trust authorization change is needed.",
  ),
  allow_trust_cant_revoke: make(
    "Authorization cannot be revoked while the trustline has liabilities.",
    "The trustline has offers or other liabilities.",
    "Remove liabilities before revoking authorization.",
  ),
  allow_trust_self_not_allowed: make(
    "An account cannot authorize a trustline to its own issued asset.",
    "The trustor and asset issuer are the same account.",
    "Use a different trustor or omit the authorization operation.",
  ),
  allow_trust_low_reserve: make(
    "The issuer lacks reserve to create a claimable balance while revoking trust.",
    "Revocation would create a claimable balance but the issuer has insufficient reserve.",
    "Fund the issuer account or resolve the trustline balance before revoking.",
  ),
  set_trust_line_flags_malformed: make(
    "The set-trustline-flags operation is malformed.",
    "The flags or trustor/asset fields are invalid.",
    "Use supported flags and verify the trustor and asset.",
  ),
  set_trust_line_flags_no_trust_line: make(
    "The trustline whose flags should change does not exist.",
    "No matching trustline is present.",
    "Create the trustline before updating its flags.",
  ),
  set_trust_line_flags_cant_revoke: make(
    "The requested trustline flag cannot be revoked in the current state.",
    "The trustline has liabilities or the change violates issuer authorization rules.",
    "Clear liabilities and verify issuer authorization settings.",
  ),
  set_trust_line_flags_invalid_state: make(
    "The requested trustline flag change is invalid for the current authorization state.",
    "The trustline flags cannot transition to the requested combination.",
    "Check the current flags and request a supported state transition.",
  ),
  set_trust_line_flags_low_reserve: make(
    "The issuer lacks reserve to create a claimable balance while changing trustline flags.",
    "The operation would create a claimable balance without enough issuer reserve.",
    "Fund the issuer account or resolve the trustline balance before changing flags.",
  ),
};

export const horizonOperationAliases: Record<string, Record<string, string>> = {
  op_malformed: {
    payment: "payment_malformed",
    create_account: "create_account_malformed",
    change_trust: "change_trust_malformed",
    manage_sell_offer: "manage_sell_offer_malformed",
    manage_buy_offer: "manage_buy_offer_malformed",
    path_payment_strict_receive: "path_payment_strict_receive_malformed",
    path_payment_strict_send: "path_payment_strict_send_malformed",
    set_options: "set_options_malformed",
  },
  op_underfunded: {
    payment: "payment_underfunded",
    create_account: "create_account_underfunded",
    manage_sell_offer: "manage_sell_offer_underfunded",
    manage_buy_offer: "manage_buy_offer_underfunded",
    path_payment_strict_receive: "path_payment_strict_receive_underfunded",
    path_payment_strict_send: "path_payment_strict_send_underfunded",
  },
  op_no_trust: {
    payment: "payment_no_trust",
    path_payment_strict_receive: "path_payment_strict_receive_no_trust",
    path_payment_strict_send: "path_payment_strict_send_no_trust",
  },
  op_line_full: {
    payment: "payment_line_full",
    manage_sell_offer: "manage_sell_offer_line_full",
    manage_buy_offer: "manage_buy_offer_line_full",
    path_payment_strict_receive: "path_payment_strict_receive_line_full",
    path_payment_strict_send: "path_payment_strict_send_line_full",
  },
  op_no_destination: {
    payment: "payment_no_destination",
    path_payment_strict_receive: "path_payment_strict_receive_no_destination",
    path_payment_strict_send: "path_payment_strict_send_no_destination",
  },
  op_low_reserve: {
    create_account: "create_account_low_reserve",
    change_trust: "change_trust_low_reserve",
    manage_sell_offer: "manage_sell_offer_low_reserve",
    manage_buy_offer: "manage_buy_offer_low_reserve",
    set_options: "set_options_low_reserve",
  },
  op_already_exists: {
    create_account: "create_account_already_exist",
  },
  op_no_issuer: {
    payment: "payment_no_issuer",
    change_trust: "change_trust_no_issuer",
    manage_sell_offer: "manage_sell_offer_sell_no_issuer",
    manage_buy_offer: "manage_buy_offer_sell_no_issuer",
    path_payment_strict_receive: "path_payment_strict_receive_no_issuer",
    path_payment_strict_send: "path_payment_strict_send_no_issuer",
  },
};

export const horizonOperationGenericErrors: Record<string, ErrorDetails> = {
  op_malformed: {
    meaning: "The operation's parameters are malformed.",
    causes: [
      "A required field, asset, amount, or operation-specific value is invalid; this commonly affects payments, account creation, trust changes, offers, path payments, and account options.",
    ],
    fixes: [
      "Check the operation type and validate all of its parameters before rebuilding the transaction.",
    ],
    docsUrl,
  },
  op_underfunded: {
    meaning: "An account involved in the operation does not have enough of the required asset.",
    causes: [
      "The source or another participant has insufficient balance; common affected operations include payments, account creation, offers, and path payments.",
    ],
    fixes: [
      "Check the operation type, account balances, and liabilities; fund the account or reduce the amount.",
    ],
    docsUrl,
  },
  op_no_trust: {
    meaning: "An account involved in the operation lacks a required asset trustline.",
    causes: [
      "A destination or participant lacks an asset trustline; this commonly affects payments, offers, and path payments.",
    ],
    fixes: ["Check the operation type and create the missing trustline for the relevant account."],
    docsUrl,
  },
  op_line_full: {
    meaning: "A trustline involved in the operation would exceed its limit.",
    causes: [
      "A payment, offer, or path payment would credit more of an asset than a trustline can hold.",
    ],
    fixes: ["Check the operation type and raise the trustline limit or reduce the amount."],
    docsUrl,
  },
  op_no_destination: {
    meaning: "The operation's destination account does not exist.",
    causes: ["The payment or path payment destination has not been created or has been merged."],
    fixes: [
      "Check the operation type and destination account ID; create the account or select an existing one.",
    ],
    docsUrl,
  },
  op_low_reserve: {
    meaning: "An account involved in the operation cannot meet a required minimum reserve.",
    causes: [
      "Account creation, a trust change, an offer, or an account-option change would require more reserve than is available.",
    ],
    fixes: [
      "Check the operation type and reserve requirements; fund the account or remove reserve-consuming entries.",
    ],
    docsUrl,
  },
  op_already_exists: {
    meaning: "The account or ledger entry the operation tried to create already exists.",
    causes: [
      "The destination account in a create-account operation is already present on the ledger.",
    ],
    fixes: [
      "Check the operation type and target; use an existing entry or choose a new destination.",
    ],
    docsUrl,
  },
  op_no_issuer: {
    meaning: "An asset issuer required by the operation does not exist.",
    causes: ["An asset in the operation references a missing or invalid issuer account."],
    fixes: ["Check the operation type and verify each asset code and issuer account ID."],
    docsUrl,
  },
};
