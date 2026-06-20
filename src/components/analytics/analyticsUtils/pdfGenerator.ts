/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';

interface CompliancePDFData {
  framework: string;
  metrics: {
    scope1: number;
    scope2: number;
    scope3: number;
    totalEmissions: number;
    powerMWh: number;
    waterRecycled: number;
    wasteTons: number;
    score: number;
  };
  tuning: {
    renewablePercent: number;
    energyEfficiencyUpgrades: number;
    fleetElectrification: number;
    supplierAuditParticipation: number;
  };
  region: string;
  certId: string;
  timestamp: string;
}

interface CertificatePDFData {
  fiscalYear: string;
  sustainScore: number;
  remainingTaxBill: string;
  tuning: {
    renewablePercent: number;
    energyEfficiencyUpgrades: number;
    fleetElectrification: number;
    supplierAuditParticipation: number;
  };
  userEmail: string;
}

/**
 * Generates an elegant and comprehensive ESG Compliance Ledger Packet PDF.
 */
export function generateCompliancePDF(data: CompliancePDFData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper: Draw elegant outer borders
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Left Emerald edge bar decoration
  doc.setFillColor(5, 150, 105); // emerald-600
  doc.rect(10, 10, 3, pageHeight - 20, 'F');

  // Page Header
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('CARBONSYNQEARTH ESG COMPLIANCE REPORT', 20, 25);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`LEDGER PACKET ID: ${data.certId}  |  ISSUED ON: ${data.timestamp} UTC`, 20, 31);

  // Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(20, 35, pageWidth - 20, 35);

  // SECTION 1: REPORT METADATA & PARAMETERS
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(20, 40, pageWidth - 40, 28, 'F');
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('REPORT PARAMETERS & CONTEXT', 25, 46);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Active Region Filter: ${data.region}`, 25, 52);
  doc.text(`Reporting Standard: ${data.framework} Framework V4.1`, 25, 57);
  doc.text(`Compliance Sign-Off: Approved by ESG Registry Board`, 25, 62);

  doc.text(`Renewables Share: ${data.tuning.renewablePercent}%`, 110, 52);
  doc.text(`Fleet Electrify: ${data.tuning.fleetElectrification}%`, 110, 57);
  doc.text(`Supplier Audit Rate: ${data.tuning.supplierAuditParticipation}%`, 110, 62);

  // SECTION 2: CARBON EXPOSURE INDEX (SCOPE 1, 2, 3)
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(5, 150, 105); // emerald-600
  doc.text('1. CARBON FOOTPRINT TELEMETRY EXPOSURE', 20, 78);

  // Draw table headers
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(20, 82, pageWidth - 40, 7, 'F');
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('EMISSIONS VECTOR', 24, 86.5);
  doc.text('DESCRIPTION / CLASSIFICATION', 65, 86.5);
  doc.text('LEVEL (KG/H)', pageWidth - 45, 86.5, { align: 'right' });

  // Rows
  const rows = [
    { name: 'Scope 1 Emissions', desc: 'Direct Combustions / Boiler vents / Internal Fuels', val: `${data.metrics.scope1.toLocaleString()}` },
    { name: 'Scope 2 Emissions', desc: 'Indirect Utilities / Purchased Electricity Energy Grid', val: `${data.metrics.scope2.toLocaleString()}` },
    { name: 'Scope 3 Emissions', desc: 'Logistical Supply Chain / Contractor Actions / Outbound', val: `${data.metrics.scope3.toLocaleString()}` },
    { name: 'Total Raw Footprint', desc: 'Combined Carbon Footprint Index metric rate', val: `${data.metrics.totalEmissions.toLocaleString()}`, bold: true }
  ];

  let currentY = 89;
  rows.forEach((r) => {
    doc.setDrawColor(241, 245, 249);
    doc.line(20, currentY, pageWidth - 20, currentY);

    if (r.bold) {
      doc.setFont('Helvetica', 'bold');
      doc.setFillColor(236, 253, 245); // emerald-50
      doc.rect(20, currentY, pageWidth - 40, 8, 'F');
      doc.setTextColor(4, 120, 87); // emerald-700
    } else {
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
    }

    doc.setFontSize(8.5);
    doc.text(r.name, 24, currentY + 5.5);
    doc.setFont('Helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text(r.desc, 65, currentY + 5.5);
    doc.setFont('Helvetica', r.bold ? 'bold' : 'normal');
    doc.setTextColor(r.bold ? 4 : 15, r.bold ? 120 : 23, r.bold ? 87 : 42);
    doc.text(r.val, pageWidth - 24, currentY + 5.5, { align: 'right' });

    currentY += 8;
  });

  // SECTION 3: OTHER RESOURCE RESOURCE PERFORMANCE
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(5, 150, 105);
  doc.text('2. RESOURCE INVENTORY PERFORMANCE', 20, 134);

  doc.setFillColor(241, 245, 249);
  doc.rect(20, 138, pageWidth - 40, 7, 'F');
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('RESOURCE TRACK', 24, 142.5);
  doc.text('RECONCILIATION DETAILS', 65, 142.5);
  doc.text('RATE VALUE', pageWidth - 45, 142.5, { align: 'right' });

  const resourceRows = [
    { name: 'Total Power Consumption', desc: 'Direct power and substation telemetry levels', val: `${data.metrics.powerMWh.toLocaleString()} MWh/y` },
    { name: 'Water Recycled', desc: 'Volume of greywater systems and closed circuits', val: `${data.metrics.waterRecycled.toLocaleString()} m3` },
    { name: 'Waste Diverted', desc: 'Landfill-diverted byproduct recovery factors', val: `${data.metrics.wasteTons} tons` }
  ];

  currentY = 145;
  resourceRows.forEach((r) => {
    doc.setDrawColor(241, 245, 249);
    doc.line(20, currentY, pageWidth - 20, currentY);

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(15, 23, 42);

    doc.setFontSize(8.5);
    doc.text(r.name, 24, currentY + 5.5);
    doc.setFont('Helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text(r.desc, 65, currentY + 5.5);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(r.val, pageWidth - 24, currentY + 5.5, { align: 'right' });

    currentY += 8;
  });

  // SECTION 4: SCORECARD AND RATING STAMP
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(20, 180, pageWidth - 20, 180);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('3. COMPLIANCE ASSESSMENT & DECARBONIZATION AUDIT', 20, 188);

  // Small Box scorecard on the left
  doc.setFillColor(248, 250, 252);
  doc.rect(20, 193, 75, 45, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(20, 193, 75, 45, 'S');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('COMPLIANCE INDEX RATING', 25, 199);

  doc.setFontSize(36);
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text(`${data.metrics.score}`, 25, 232);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('/ 100 Overall Score', 70, 232);

  // Text explanation on the right
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('RESTRUCTURING EFFORTS ANALYSIS', 105, 199);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  
  const textParagraphs = [
    `The overall corporate ESG assessment has computed a Compliance rating score of ${data.metrics.score} out of 100. Parameters suggest optimized green utilities and proactive mitigation policies are in place.`,
    `Our continuous monitoring verifies that maintaining an energy-efficiency target above ${data.tuning.energyEfficiencyUpgrades}% reduces regional carbon tax implications. Re-configuring key supply networks guarantees permanent adherence with modern Scope targets.`,
    `In lockstep with CSRD alignment rules, please submit this packet to external auditors to file certified emission returns and avoid statutory non-compliance fines.`
  ];

  let textY = 205;
  textParagraphs.forEach((p) => {
    const wrappedLines = doc.splitTextToSize(p, pageWidth - 120);
    doc.text(wrappedLines, 105, textY);
    textY += (wrappedLines.length * 4) + 2;
  });

  // Footer seal and signature area
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('AUTHORIZED REGISTRY BOARD SEAL', 20, 255);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Verified Signature Patch CS-ESG-BOARD-94-S', 20, 260);

  // Digital stamp
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.8);
  doc.rect(pageWidth - 65, 245, 45, 15);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(16, 185, 129);
  doc.text('APPROVED', pageWidth - 42.5, 252, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('CARBONSYNQEARTH ESG REGISTRY', pageWidth - 42.5, 257, { align: 'center' });

  // Browser download trigger
  doc.save(`CarbonSynqEarth-${data.framework}-Compliance-Report.pdf`);
}

/**
 * Generates an elegant and authentic Certificate of Carbon Audit and Compliance.
 */
export function generateCertificatePDF(data: CertificatePDFData) {
  const doc = new jsPDF({
    orientation: 'landscape', // Landscape works perfectly for Certs!
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background frame
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Double gold/emerald borders
  doc.setDrawColor(16, 185, 129); // emerald-500
  doc.setLineWidth(1.2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');

  doc.setDrawColor(204, 251, 241); // emerald-100
  doc.setLineWidth(0.4);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24, 'S');

  // Certificate Header
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('CERTIFICATE OF RECONCILED COMPLIANCE', pageWidth / 2, 35, { align: 'center' });

  // Subtitle
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(4, 120, 87); // emerald-700
  doc.text('REGULATORY SUSTAINABILITY AND DECARBONIZATION SANCTION', pageWidth / 2, 42, { align: 'center' });

  // Decorative element (star or leaves)
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.3);
  doc.line(pageWidth / 2 - 30, 48, pageWidth / 2 + 30, 48);

  // Content Paragraph
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('This is to certify that environmental parameters registered by corporate user', pageWidth / 2, 58, { align: 'center' });
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text(data.userEmail || 'ata1waris55@gmail.com', pageWidth / 2, 66, { align: 'center' });

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.text(`have been analyzed and passed rigorous audit screening for modern environmental regulations during`, pageWidth / 2, 74, { align: 'center' });
  
  doc.setFont('Helvetica', 'bold');
  doc.text(`FISCAL YEAR ${data.fiscalYear}`, pageWidth / 2, 80, { align: 'center' });

  // Statistics Grid Cards
  const colWidth = 55;
  const colY = 93;
  const colStartX = (pageWidth - (colWidth * 4)) / 2;

  const stats = [
    { title: 'SUSTAIN SCORE', val: `${data.sustainScore} / 100`, note: 'AAA Grade Tier 1' },
    { title: 'GRID RENEWABLE %', val: `${data.tuning.renewablePercent}%`, note: 'Solar / Wind Sourced' },
    { title: 'FLEET ELECTRIFIED', val: `${data.tuning.fleetElectrification}%`, note: 'Scope 3 Logistics' },
    { title: 'REMAINING TAX BILL', val: `$${data.remainingTaxBill}`, note: 'Carbon Offset Adjusted' }
  ];

  stats.forEach((st, i) => {
    const cardX = colStartX + (i * colWidth) + 2.5;

    // Draw little card background
    doc.setFillColor(255, 255, 255);
    doc.rect(cardX, colY, colWidth - 5, 28, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.rect(cardX, colY, colWidth - 5, 28, 'S');

    // Colored accent top bar
    doc.setFillColor(16, 185, 129);
    doc.rect(cardX, colY, colWidth - 5, 1.5, 'F');

    // Card Texts
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(st.title, cardX + (colWidth - 5) / 2, colY + 7, { align: 'center' });

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(st.val, cardX + (colWidth - 5) / 2, colY + 16, { align: 'center' });

    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(16, 185, 129);
    doc.text(st.note, cardX + (colWidth - 5) / 2, colY + 23, { align: 'center' });
  });

  // Footer Certificate Metadata
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('This ledger package and associated emission records have been recorded on CarbonSynqEarth ESG distributed ledger network under node identifier: CS-ID-0x98FF2C.', pageWidth / 2, 137, { align: 'center' });

  // Signatures
  // Left Sign
  doc.setDrawColor(148, 163, 184);
  doc.line(30, 165, 90, 165);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Environment Authority Representative', 60, 170, { align: 'center' });

  // Right Sign
  doc.line(pageWidth - 90, 165, pageWidth - 30, 165);
  doc.text('CarbonSynqEarth CSRD Auditor Board', pageWidth - 60, 170, { align: 'center' });

  // Visual Seal Icon
  doc.setFillColor(209, 250, 229); // emerald-100
  doc.ellipse(pageWidth / 2, 162, 11, 11, 'F');
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.6);
  doc.ellipse(pageWidth / 2, 162, 11, 11, 'S');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(4, 120, 87);
  doc.text('CS', pageWidth / 2, 165.5, { align: 'center' });

  // Browser download trigger
  doc.save(`CarbonSynqEarth-Certificate-${data.fiscalYear}.pdf`);
}
