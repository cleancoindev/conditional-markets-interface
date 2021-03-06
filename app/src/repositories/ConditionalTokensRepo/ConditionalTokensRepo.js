import assert from "assert";

export default class ConditionalTokensRepo {
  constructor({ contracts }) {
    assert(contracts, '"contracts" is required');

    this._conditionalTokens = contracts.pmSystem;
  }

  async balanceOf(account, positionId) {
    return this._conditionalTokens.balanceOf(account, positionId);
  }

  async getOutcomeSlotCount(id) {
    return this._conditionalTokens.getOutcomeSlotCount(id);
  }

  async conditionIds(index) {
    return this._conditionalTokens.conditionIds(index);
  }

  async getCollectionId(parentCollectionId, conditionId, indexSet) {
    return this._conditionalTokens.getCollectionId(
      parentCollectionId,
      conditionId,
      indexSet
    );
  }

  async payoutDenominator(conditionId) {
    return this._conditionalTokens.payoutDenominator(conditionId);
  }

  async payoutNumerators(conditionId, outcomeIndex) {
    return this._conditionalTokens.payoutNumerators(conditionId, outcomeIndex);
  }

  // Queries the approval status of an operator for a given owner.
  async isApprovedForAll(account, lmsrMarketMakerAddress) {
    return this._conditionalTokens.isApprovedForAll(
      account,
      lmsrMarketMakerAddress
    );
  }

  // Sets or unsets the approval of a given operator
  async setApprovalForAll(lmsrMarketMakerAddress, approved, from) {
    return this._conditionalTokens.setApprovalForAll(
      lmsrMarketMakerAddress,
      approved,
      { from }
    );
  }

  async redeemPositions(
    collateralAddress,
    parentCollectionId,
    marketConditionId,
    indexSets,
    from
  ) {
    return this._conditionalTokens.redeemPositions(
      collateralAddress,
      parentCollectionId,
      marketConditionId,
      indexSets,
      { from }
    );
  }
}
