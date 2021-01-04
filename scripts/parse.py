import os
import sys

FACTION_LIST = {
	"craftworlds": "Aeldari - Craftworlds.cat",
	"drukhari": "Aeldari - Drukhari.cat",
	"harlequins": "Aeldari - Harlequins.cat",
	"fw_corsairs": "Aeldari - FW Corsairs.cat",
	"chaos_knights": "Chaos - Chaos Knights.cat",
	"ynnari": "Aeldari - Ynnari.cat",
	"chaos_space_marines": "Chaos - Chaos Space Marines.cat",
	"daemons": "Chaos - Daemons.cat",
	"death_guard": "Chaos - Death Guard.cat",
	"fw_heretic_astartes": "Chaos - FW Heretic Astartes.cat",
	"fw_renegade_and_heretics": "Chaos - FW Renegade and Heretics.cat",
	"titanicus_traitoris": "Chaos - Titanicus Traitoris.cat",
	"thousand_sons": "Chaos - Thousand Sons.cat",
	"servants_of_the_abyss": "Chaos - Servants of the Abyss.cat",
	"gellerpox_infected": "Chaos - Gellerpox Infected.cat",
	"adepta_sororitas": "Imperium - Adepta Sororitas.cat",
	"fallen": "Fallen.cat",
	"adeptus_custodes": "Imperium - Adeptus Custodes.cat",
	"adeptus_astra_telepathica": "Imperium - Adeptus Astra Telepathica.cat",
	"adeptus_mechanicus": "Imperium - Adeptus Mechanicus.cat",
	"black_templars": "Imperium - Black Templars.cat",
	"blackstone_fortress": "Imperium - Blackstone Fortress.cat",
	"astra_militarum_library": "Imperium - Astra Militarum - Library.cat",
	"astra_militarum": "Imperium - Astra Militarum.cat",
	"dark_angels": "Imperium - Dark Angels.cat",
	"blood_angels": "Imperium - Blood Angels.cat",
	"deathwatch": "Imperium - Deathwatch.cat",
	"elucidian_starstriders": "Imperium - Elucidian Starstriders.cat",
	"fw_adeptus_astartes": "Imperium - FW Adeptus Astartes.cat",
	"fw_death_korps_of_krieg": "Imperium - FW Death Korps of Krieg.cat",
	"fw_elysians": "Imperium - FW Elysians.cat",
	"grey_knights": "Imperium - Grey Knights.cat",
	"imperial_fists": "Imperium - Imperial Fists.cat",
	"imperial_knights": "Imperium - Imperial Knights.cat",
	"inquisition": "Imperium - Inquisition.cat",
	"legion_of_the_damned": "Imperium - Legion of the Damned.cat",
	"iron_hands": "Imperium - Iron Hands.cat",
	"officio_assassinorum": "Imperium - Officio Assassinorum.cat",
	"raven_guard": "Imperium - Raven Guard.cat",
	"salamanders": "Imperium - Salamanders.cat",
	"sisters_of_silence": "Imperium - Sisters of Silence.cat",
	"space_wolves": "Imperium - Space Wolves.cat",
	"space_marines": "Imperium - Space Marines.cat",
	"titan_legions": "Imperium - Titan Legions.cat",
	"ultramarines": "Imperium - Ultramarines.cat",
	"white_scars": "Imperium - White Scars.cat",
	"necrons": "Necrons.cat",
	"orks": "Orks.cat",
	"tau_empire": "T'au Empire.cat",
	"genestealer_cults": "Tyranids - Genestealer Cults.cat",
	"tyranids": "Tyranids.cat"
};

def printUsage():
	print "This program fetches all the weapon profiles from an xml .cat file, and translates them to JSON."	
	print "Usage: "
	print "parse.py [source_path] [dest_path]"

def main():
	# Validate CLE arguments 
	if (len(sys.argv) != 3):
		print "[ARG ERR] Too few arguments."
		printUsage()
		return False

	src = sys.argv[1]
	dest = sys.argv[2]

	#Add final slashes if necessary
	if (src[-1] != "/"):
		src = src + "/"
	if (dest[-1] != "/"):
		dest = dest + "/"

	for factionItem in FACTION_LIST.items():
		print "DEALING WITH FACTION ITEM: ", factionItem
		destPath = dest + factionItem[0] 
		if (not os.path.isdir(destPath)):
			os.mkdir(destPath)

		cmd = 'python parse_faction.py {0} {1} {2}'.format(factionItem[0], '"' + src + factionItem[1] + '"', destPath)
		print cmd
		os.system(cmd)

	return True 

if __name__ == "__main__":
    main()

