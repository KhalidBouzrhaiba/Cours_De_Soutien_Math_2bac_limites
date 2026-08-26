import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Downloads a DOM element as a high-quality multi-page PDF document.
 * Creates an off-screen standard A4 container so the output is always consistently formatted.
 */
export async function generateAndDownloadLessonPDF(
  sourceElement: HTMLElement,
  title = 'Resume_Maths_2BAC_Limites_Continuite',
  onProgress?: (status: string) => void
): Promise<void> {
  onProgress?.('Préparation du document...');

  // Create an off-screen clone with standard desktop width (800px) for consistent layout
  const clone = sourceElement.cloneNode(true) as HTMLElement;
  
  // Create an offscreen wrapper
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '-99999px';
  wrapper.style.left = '-99999px';
  wrapper.style.width = '800px';
  wrapper.style.backgroundColor = '#ffffff';
  wrapper.style.padding = '24px';
  wrapper.style.zIndex = '-1000';
  wrapper.style.boxSizing = 'border-box';
  wrapper.className = 'pdf-render-root';

  // Add an official academic header
  const headerDiv = document.createElement('div');
  headerDiv.style.borderBottom = '2px solid #2563eb';
  headerDiv.style.paddingBottom = '16px';
  headerDiv.style.marginBottom = '24px';
  headerDiv.style.display = 'flex';
  headerDiv.style.justifyContent = 'space-between';
  headerDiv.style.alignItems = 'center';
  headerDiv.innerHTML = `
    <div>
      <div style="font-size: 11px; font-weight: bold; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">
        Royaume du Maroc · Enseignement Secondaire Qualifiant
      </div>
      <h1 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 4px 0 2px 0;">
        Mathématiques 2BAC BIOF (PC · SVT · SM)
      </h1>
      <p style="font-size: 12px; color: #475569; margin: 0;">
        Fiche Complète & Résumé : Limites, Continuité, TVI & Fonctions Réciproques · Préparé par <strong>Prof. Khalid Bouzrhaiba</strong>
      </p>
    </div>
    <div style="text-align: right;">
      <span style="display: inline-block; background: #eff6ff; color: #1d4ed8; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 9999px; border: 1px solid #bfdbfe;">
        Prof. Khalid Bouzrhaiba
      </span>
      <div style="font-size: 10px; color: #64748b; margin-top: 4px;">
        WhatsApp : +212 698-595978
      </div>
    </div>
  `;
  wrapper.appendChild(headerDiv);

  // Unhide any hidden modules in clone
  const sections = clone.querySelectorAll('section');
  sections.forEach((sec) => {
    (sec as HTMLElement).style.display = 'block';
    (sec as HTMLElement).style.marginBottom = '20px';
    (sec as HTMLElement).style.pageBreakInside = 'avoid';
  });

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  try {
    onProgress?.('Rendu haute résolution des formules mathématiques...');

    // Small delay to ensure KaTeX and fonts are fully settled
    await new Promise((resolve) => setTimeout(resolve, 300));

    const canvas = await html2canvas(wrapper, {
      scale: 2, // 2x scale for crisp 300dpi-like math typography
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 800,
    });

    onProgress?.('Génération du fichier PDF A4...');

    const imgWidth = 190; // A4 printable width in mm (210 - 20 margin)
    const pageHeight = 277; // A4 printable height in mm (297 - 20 margin)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    let position = 10; // Top margin
    const marginX = 10; // Left margin

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // First page
    pdf.addImage(imgData, 'JPEG', marginX, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Add subsequent pages if content exceeds 1 page
    let pageNumber = 1;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pageNumber++;
      pdf.addImage(imgData, 'JPEG', marginX, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    onProgress?.('Téléchargement en cours...');
    pdf.save(`${title}.pdf`);
  } finally {
    // Clean up DOM wrapper
    if (document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }
  }
}
