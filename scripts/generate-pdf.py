import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_pdf():
    # Paths
    pdf_path = os.path.expanduser("~/Downloads/rhema_management.pdf")
    screenshot_path = "/Users/Kgomotso/.gemini/antigravity/brain/3875aeaa-a495-4ad2-96f2-066aa42c758a/.user_uploaded/media_1787926358520.png"
    
    # Page setup (0.5 inch margins for max printable area)
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    story = []
    styles = getSampleStyleSheet()
    
    # Custom colors
    gold = colors.HexColor("#D4AF37")
    dark_gray = colors.HexColor("#1A1A1A")
    light_gold = colors.HexColor("#FCF8E3")
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        textColor=gold,
        spaceAfter=6,
        alignment=1 # Centered
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        textColor=colors.white,
        alignment=1, # Centered
        spaceAfter=12
    )
    
    h1_style = ParagraphStyle(
        'SecHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        textColor=gold,
        spaceBefore=14,
        spaceAfter=6,
        borderPadding=4
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#333333"),
        spaceAfter=6
    )
    
    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Code'],
        fontName='Courier',
        fontSize=10,
        textColor=colors.HexColor("#D4AF37"),
        spaceAfter=4
    )
    
    # Header Banner (Table with background color)
    header_data = [
        [Paragraph("RHEMA WORD MINISTRIES", title_style)],
        [Paragraph("Website Content Management Guide (Marketing & Admin)", subtitle_style)]
    ]
    header_table = Table(header_data, colWidths=[doc.width])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), dark_gray),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 10))
    
    # Intro
    intro_p = "Welcome to the Rhema Word Ministries administration guide. This document contains step-by-step instructions for updating the website banner announcements and scheduling events (including flyer poster uploads)."
    story.append(Paragraph(intro_p, body_style))
    
    # Section 1: Accessing the Admin Portal
    story.append(Paragraph("1. Accessing the Admin Portal", h1_style))
    story.append(Paragraph("To access the dashboard, visit the website and follow these details:", body_style))
    
    login_info = [
        [Paragraph("<b>Portal URL:</b>", body_style), Paragraph("<font color='#0066cc'><u>https://rhemawordministries.co.zw</u></font> (Click <b>Admin</b> in navbar)", body_style)],
        [Paragraph("<b>Admin Email:</b>", body_style), Paragraph("admin@rhemawordministries.co.zw <i>(or type 'admin')</i>", body_style)],
        [Paragraph("<b>Password:</b>", body_style), Paragraph("<b>RhemaAdmin2026</b>", code_style)]
    ]
    login_table = Table(login_info, colWidths=[100, doc.width - 100])
    login_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F9F9F9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E5E5E5")),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(login_table)
    
    # Section 2: Updating the Announcement Banner
    story.append(Paragraph("2. Updating the Top Announcement Banner", h1_style))
    story.append(Paragraph("The top announcement banner is perfect for highlighting urgent notices, events, or calls to action.", body_style))
    steps_banner = (
        "• Click on <b>Live Banner</b> in the admin sidebar menu.<br/>"
        "• Turn the banner <b>On/Off</b> using the check box.<br/>"
        "• Enter the <b>Badge text</b> (e.g. 'NEW', 'NOTICE'), the <b>Message</b>, the <b>Button Text</b>, and the <b>Button Link</b>.<br/>"
        "• Click <b>Save</b> to push updates live instantly."
    )
    story.append(Paragraph(steps_banner, body_style))
    
    # Section 3: Scheduling Events & Flyer Uploads
    story.append(Paragraph("3. Scheduling Events & Flyer Uploads", h1_style))
    story.append(Paragraph("The events manager updates both the home page carousel and the sidebar list in real time.", body_style))
    steps_events = (
        "• Click on <b>Events & Services</b> in the admin sidebar.<br/>"
        "• Click the gold <b>+ Schedule Event</b> button (located in the top right of the table).<br/>"
        "• Fill in the title, date, time slot, location, and description.<br/>"
        "• Click <b>Choose File</b> next to <b>Or Upload New Poster Image</b> to select a flyer from your computer or phone.<br/>"
        "• Click <b>Save to Database</b> to upload the flyer and push the event live."
    )
    story.append(Paragraph(steps_events, body_style))

    # Section 4: Weekly Word & Video Sermons
    story.append(Paragraph("4. Publishing Weekly Word & Video Sermons", h1_style))
    story.append(Paragraph("You can post Apostle Keith's weekly teachings and attach either direct video files or YouTube stream links.", body_style))
    steps_video = (
        "• Click on <b>Weekly Word</b> in the admin sidebar.<br/>"
        "• Click <b>+ Write Weekly Word</b> (or click the pencil icon to edit an existing sermon).<br/>"
        "• Under <b>Video URL or YouTube Link</b>: paste a YouTube, Vimeo, or stream link.<br/>"
        "• <b>Or Upload Video File</b>: Click <b>Choose File</b> to upload an MP4/WebM video file directly.<br/>"
        "• Enter the Title, Category, Summary, and Sermon Body, then click <b>Save to Database</b>.<br/>"
        "• The embedded video player will appear automatically on the Weekly Word page!"
    )
    story.append(Paragraph(steps_video, body_style))

    # Section 5: Photo Gallery Uploads
    story.append(Paragraph("5. Photo Gallery & Outreach Uploads", h1_style))
    steps_gallery = (
        "• Click on <b>Photo Gallery</b> in the admin sidebar.<br/>"
        "• Click <b>+ Upload Photo</b>.<br/>"
        "• Choose your photo file directly, enter a title/caption, and click <b>Save to Database</b>."
    )
    story.append(Paragraph(steps_gallery, body_style))
    
    # Include screenshot
    if os.path.exists(screenshot_path):
        story.append(Spacer(1, 10))
        # Scale to fit page width (540 points is doc.width on standard letter with margins)
        img = Image(screenshot_path, width=420, height=260)
        img.hAlign = 'CENTER'
        
        # Wrapped in a nice border
        img_table = Table([[img]], colWidths=[doc.width])
        img_table.setStyle(TableStyle([
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#D4AF37")),
            ('PADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(img_table)
        story.append(Paragraph("<font size='7.5' color='#666666'><i>Figure 1: Overview of the Ministry Control Center Dashboard</i></font>", subtitle_style))
    
    # Build Document
    doc.build(story)
    print("PDF generated successfully at:", pdf_path)

if __name__ == "__main__":
    generate_pdf()
