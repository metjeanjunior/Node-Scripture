import json

f= open('disBible.json', 'w')
with open('bible.json') as data_file:    
    data = json.load(data_file)

f.write('{\n')
f.write('\t"bible":\n')
f.write('\t\t{\n')

for verse in data['resultset']['row']:
	key = '\t\t\t"'+ str(verse["field"][0]) + '":'
	val = '"'+ str(verse["field"][4]) + '",\n'
	f.write(key)
	f.write(val)
f.write('}}')
