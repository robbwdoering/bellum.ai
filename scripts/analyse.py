import os
import sys
import glob


def printUsage():
	print "This program fetches all the weapon profiles from an xml .cat file, and translates them to JSON."	
	print "Usage: "
	print "parse.py [directory]"

def main():
	# Validate CLE arguments 
	if (len(sys.argv) != 2):
		print "[ARG ERR] Expected 2 arguments, got ", len(sys.argv)
		printUsage()
		return False

	print "Beginning analysis..."

	resultDir = sys.argv[1]

	if (resultDir[-1] != "/"):
		resultDir = resultDir + "/"

	result = {}

	for fileName in glob.glob(resultDir + "**/*.sql"):
		# Parse the file type to get the relevant index
		typeIdx = 0
		fileType = fileName.split("/")[-1]
		if (fileType == "desc.sql"):
			typeIdx = 0
		elif (fileType == "stat.sql"):
			continue	
		elif (fileType == "weapon.sql"):
			typeIdx = 1

		# Parse the faction, and create the init value for this faction if necesary
		faction = fileName.split("/")[-2]
		if (not faction in result.keys()):
			result[faction] = [
				[0, 0, 0],
				[0, 0, 0]
			]

		with open(fileName, "r") as fPtr:
			for line in fPtr: 
				# 0 ==> Pending Objects
				if '"type": "",' in line:
					result[faction][typeIdx][0] += 1
				# 1 ==> Empty Objects
				elif '{}' in line:
					result[faction][typeIdx][1] += 1
				# 2 ==> Filled Out Objects
				elif '"type":' in line:
					result[faction][typeIdx][2] += 1

	with open("results.md", "w") as filePtr:
		filePtr.write("# Analysis Of Meaning Objects\n")
		filePtr.write("This document contains some simple stats on the meaning objects. See main Meaing Objects doc in the /docs folder for details.\n")
		filePtr.write("\n")
		filePtr.write("\n")
		filePtr.write("|   Faction   |   % Complete   |   Empty   |   Pending   |   Total   |\n")
		filePtr.write("|-------------|----------------|-----------|-------------|-----------|\n")

		totalPending = 0
		totalEmpty = 0
		totalComplete = 0
		grandTotal = 0

		for factionItem in result.items():
			# Get totals for this faction
			pending = factionItem[1][0][0] + factionItem[1][1][0]
			empty = factionItem[1][0][1] + factionItem[1][1][1]
			complete = factionItem[1][0][2] + factionItem[1][1][2]
			total = pending + empty + complete

			# Add those totals to the grand totals
			totalPending += pending
			totalEmpty += empty
			totalComplete += complete
			grandTotal += total

			# Record this faction's row
			filePtr.write("| {0} | {1} | {2} | {3} | {4} |\n".format(factionItem[0], complete / total, empty, pending, total))

		filePtr.write("| {0} | {1} | {2} | {3} | {4} |\n".format("TOTAL", totalComplete / grandTotal, totalEmpty, totalPending, grandTotal))
		filePtr.write("\n")	



if __name__ == "__main__":
    main()
