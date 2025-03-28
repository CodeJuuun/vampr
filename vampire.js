class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }
//------------------------------------------------------------------------
  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    // console.log(this)
    // console.log(`adding offspring: ${vampire.name} to ${this.name}`)
    this.offspring.push(vampire)
    vampire.creator = this;
  }
//------------------------------------------------------------------------
  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length
  }
//------------------------------------------------------------------------
  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numAwayFromOriginal = 0;
    let currentVampire = this; // refers to the current instance (new)

    while(currentVampire.creator !== null) {
      currentVampire = currentVampire.creator
      numAwayFromOriginal++
    }
    return numAwayFromOriginal
  }
//------------------------------------------------------------------------
  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true
    } else {
      return false
    }
  }
//------------------------------------------------------------------------
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
//------------------------------------------------------------------------
 // Returns the vampire object with that name, or null if no vampire exists with that name
 vampireWithName(name) {
  if (!name) {
    return null
  }

  if (name === this.name) {
    return this;
  }

  for (let targetName of this.offspring) {
    let targetFound = targetName.vampireWithName(name);
    if (targetFound) {
      return targetFound
    }
  }
  return null
 }
//------------------------------------------------------------------------
 // Returns the total number of vampires that exist
 get totalDescendents() {
  let total = 0;
  for (let child of this.offspring) {
    total+= 1 + child.totalDescendents;
  }
  return total;
 }
//------------------------------------------------------------------------
 // Returns an array of all the vampires that were converted after 1980
 get allMillennialVampires() {
  let vamprAfter1980 = []
  if (this.yearConverted >  1980) {
    vamprAfter1980.push(this)
  }

  for (let child of this.offspring) {
    vamprAfter1980 = vamprAfter1980.concat(child.allMillennialVampires)
  }

  return vamprAfter1980
 }

}

module.exports = Vampire;

