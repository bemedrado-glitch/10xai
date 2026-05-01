/** Per-engine ROI computation functions. Inputs are keyed by RoiInput.key. */
export const ROI_FORMULAS: Record<string, (i: Record<string, number>) => Record<string, number>> = {
  lighthouse: (i) => {
    const hoursSaved = i.hoursPerWeek * 4 * i.reps;
    const pipelineAdded = hoursSaved * (i.dealValue * 0.015);
    const monthlyCost = 1999;
    const payback = pipelineAdded > 0 ? Math.ceil(monthlyCost / (pipelineAdded / 12)) : 0;
    return { hoursSaved, pipelineAdded, payback };
  },
  sales: (i) => {
    const additionalMeetings = 8;
    const revenueImpact = additionalMeetings * i.dealValue * (i.closeRate / 100);
    const monthlyCost = 1999;
    const payback = revenueImpact > 0 ? Math.ceil(monthlyCost / (revenueImpact / 12)) : 0;
    return { additionalMeetings, revenueImpact, payback };
  },
  care: (i) => {
    const hoursSaved = (i.ticketsPerMonth * i.avgHandleMinutes) / 60 * 0.7;
    const costSaved = hoursSaved * i.staffCostHour;
    const monthlyCost = 1999;
    const payback = costSaved > 0 ? Math.ceil(monthlyCost / (costSaved / 12)) : 0;
    return { hoursSaved, costSaved, payback };
  },
  reach: (i) => {
    const hoursSaved = i.contentPiecesPerMonth * i.hoursPerPiece * 0.85;
    const costSaved = hoursSaved * i.staffCostHour;
    const monthlyCost = 3299;
    const payback = costSaved > 0 ? Math.ceil(monthlyCost / (costSaved / 12)) : 0;
    return { hoursSaved, costSaved, payback };
  },
  mind: (i) => {
    const weeksSaved = i.hiresPerQuarter * i.rampWeeks * 0.45;
    const costSaved = weeksSaved * i.weeklyCost;
    const oneTimeCost = 3500;
    const payback = costSaved > 0 ? Math.ceil(oneTimeCost / (costSaved / 3)) : 0;
    return { weeksSaved: Math.round(weeksSaved * 10) / 10, costSaved, payback };
  },
  bid: (i) => {
    const hoursSaved = i.rfpsPerMonth * i.hoursPerRfp * 0.6;
    const costSaved = hoursSaved * i.staffCostHour;
    const oneTimeCost = 5000;
    const payback = costSaved > 0 ? Math.ceil(oneTimeCost / (costSaved / 12)) : 0;
    return { hoursSaved, costSaved, payback };
  },
  bernie: (i) => {
    const additionalLeads = Math.round(i.visitorsPerMonth * 0.02);
    const revenueImpact = additionalLeads * i.dealValue * 0.25;
    const monthlyCost = 99;
    const payback = revenueImpact > 0 ? Math.ceil(monthlyCost / (revenueImpact / 12)) : 0;
    return { additionalLeads, revenueImpact, payback };
  },
};
