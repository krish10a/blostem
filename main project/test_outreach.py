import requests
import json

base_url = "http://127.0.0.1:8000"

def test_generate_outreach():
    print("Testing generate outreach...")
    
    # We will assume that Stripe was inserted as Prospect ID 1 and has mapped personas from Module 4
    # Let's hit the general prospects endpoint to find a prospect with persona_map
    res = requests.get(f"{base_url}/prospects/")
    if res.status_code != 200:
        print("Failed to get prospects")
        return
        
    prospects = res.json()
    test_prospect = next((p for p in prospects if p.get('persona_map')), None)
    
    if not test_prospect:
        print("No prospect with persona mapping found. Ensure Module 4 was tested on the DB.")
        return
        
    prospect_id = test_prospect['id']
    print(f"Executing generate-outreach on Prospect ID {prospect_id} ({test_prospect['company_name']})")
    
    gen_res = requests.post(f"{base_url}/prospects/{prospect_id}/generate-outreach")
    if gen_res.status_code == 200:
        print("Successfully generated outreach!")
        data = gen_res.json()
        messages_str = data.get('messages')
        if messages_str:
            try:
                parsed = json.loads(messages_str)
                print("Generated Messages JSON looks like:")
                print(json.dumps(parsed, indent=2)[:500] + "\n...[truncated]")
            except:
                print("Failed to parse the messages JSON output.")
        else:
            print("Messages field is empty.")
    else:
        print(f"Failed to generate outreach. Status: {gen_res.status_code}")
        print(gen_res.json())

if __name__ == "__main__":
    test_generate_outreach()
