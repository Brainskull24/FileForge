from db.share_link import create_share_link, get_share_link

link_id = create_share_link({
    "filename": "secret.png",
    "path": "uploads/secret.png"
})

print("Share link created:", link_id)

doc = get_share_link(link_id)
if doc:
    print("Found:", doc)
else:
    print("Expired or not found")
