UPDATE messages m 
	JOIN messages b ON m.base_message = b.id 
    SET 
		m.base_message_subject = b.subject,
		m.base_message_subject_type = b.subject_type,
		m.base_message_type = b.message_type
	WHERE m.base_message IS NOT NULL;