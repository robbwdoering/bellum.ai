import sys
import re
import xml.etree.ElementTree as ET

## parse_faction.py
## This script goes through the given .cat XML file, and flags a tiny fraction of the data to be remembered in three .sql files 

def san(str):
	return str.replace(" ", "_").replace("'", "").lower()

def printUsage():
	print "This program fetches all the weapon profiles from an xml .cat file, and translates them to JSON."	
	print "Usage: "
	print "parse_weapons.py [faction_name] [cat_path] [result_path]"

def getChar(name, root):
	for char in root.iter(None):
		if (tagIs(char, "characteristic") and char.attrib["name"] == name):
			elemText = char.text
			if (elemText == "-" or elemText == None):
				return ""
			return elemText.encode("utf-8", "ignore").replace('"', "").replace("'", "")
	return "NOT_FOUND"

def tagIs(obj, string):
	return obj.tag.split("}")[-1] == string 

def parseWeapon(name, faction, profile, wepFile):
	ap 			= getChar("AP", profile)
	damage 		= getChar("D", profile)
	rng 		= getChar("Range", profile)
	strength	= getChar("S", profile)
	weapontype 	= getChar("Type", profile) 
	shots 		= "1"
	abilities 	= getChar("Abilities", profile)

	# Clean range
	if (rng == "Melee" or rng == ""):
		rng = "0"

	# Clean Weapon Type + Shots
	weapontypeArr = weapontype.split(" ")
	if (len(weapontypeArr) > 1 and re.match(r'^[0-9]*[Dd]*[0-9]*', weapontypeArr[-1])):
		weapontype = " ".join(weapontypeArr[0:-1])
		shots = weapontypeArr[-1]
	
	# Figure out if this entry will need a meaning object
	abilStr = "{})," 
	if (abilities not in (None, "", "-")):
		abilStr = '{' + '\n\t-- {0}\n\t"type": "",\n\t"params":\n'.format(abilities) + '}),'

	# Write the main line
	newLine = '("{0}", "{1}",\t{2},\t"{3}",\t"{4}",\t"{5}",\t"{6}",\t"{7}",{8}\n'.format(
		faction, name, ap, damage, rng, strength, weapontype, shots, abilStr)
	wepFile.write(newLine)

def parseStat(name, faction, profile, statFile):
	attacks		= getChar("A", profile)
	ballistics	= getChar("BS", profile)
	weapons		= getChar("WS", profile)
	move		= getChar("M", profile)
	save		= getChar("Save", profile)
	strength	= getChar("S", profile)
	toughness	= getChar("T", profile)
	wounds		= getChar("W", profile)
	leadership	= getChar("Ld", profile)
	invuln 		= "6"

	# Clean save value
	saveArr = save.split("/")
	if (len(saveArr) > 1):
		save = int(saveArr[0][0])
		invuln = int(saveArr[1][0])

	# Write the main line
	newLine = '("{0}", "{1}",\t"{2}",\t{3},\t{4},\t{5},\t{6},\t{7},\t{8},\t{9},\t{10},\t{11}),\n'.format(
		faction, name, attacks, ballistics, weapons, move, save, strength, invuln, toughness, wounds, leadership)
	statFile.write(newLine)

def parseDesc(name, faction, profile, descFile):
	val = getChar("Description", profile).replace("\n", " ")
	val = "{\n\t-- " + val + '\n\t"type": "",\n\t"params":\n}),\n'
	# val = val.encode("utf-8", "ignore")

	# Write the main line
	newLine = '("{0}", "{1}", '.format(faction, name) + val
	descFile.write(newLine + val)


def main():
	# Validate CLE arguments 
	if (len(sys.argv) != 4):
		print "[ARG ERR] Too few arguments."
		printUsage()
		return False

	faction = sys.argv[1];
	catPath = sys.argv[2];
	resPath = sys.argv[3];

	print "Starting Faction Parse for ", faction, "\n"

	# Open and parse the cat file into a python object
	print "Parsing CAT file..."
	root = ET.parse(catPath).getroot()

	# Open the result file 
	print "Opening result file..."
	wepFile = open(resPath+"/weapon.sql", "w")
	wepFile.write("INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES\n")

	descFile = open(resPath+"/desc.sql", "w")
	descFile.write("INSERT INTO war_desc_profile (faction, name, meaning) VALUES\n")

	statsFile = open(resPath+"/stat.sql", "w")
	statsFile.write("INSERT INTO war_stat_profile (faction, name, attacks, ballistics, weapons, move, save, strength, invuln, toughness, wounds, leadership) VALUES\n")

	# TODO
	# descFile = open(resPath+"/powers.sql", "w");
	# selectionEntries = root.find('sharedSelectionEntries')	
	for profile in root.iter(None):
		if (tagIs(profile, "profile")):
			typeName = profile.get("typeName")
			name = san(profile.get("name")).encode("utf-8", "ignore").replace('"', '')

			# Fill out weapon entries
			if (typeName == "Weapon"):
				parseWeapon(name, faction, profile, wepFile)

			elif (typeName == "Abilities"):
				parseDesc(name, faction, profile, descFile)	

			elif (typeName == "Unit"):
				parseStat(name, faction, profile, statsFile)	

	wepFile.close()
	descFile.close()
	statsFile.close()

if __name__ == "__main__":
    main()
